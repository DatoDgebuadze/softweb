#!/usr/bin/env python3
import csv
import re
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape


ROOT = Path(__file__).resolve().parents[1]
REPORTS_DIR = ROOT / "reports"
HTML_FILES = [
    ROOT / "index.html",
    ROOT / "about.html",
    ROOT / "services.html",
    ROOT / "projects.html",
    ROOT / "contact.html",
]
JS_MAIN = ROOT / "js" / "main.js"


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def extract_html_keys():
    data_i18n = re.compile(r'data-i18n="([^"]+)"')
    data_i18n_attr = re.compile(r'data-i18n-attr="([^"]+)"')
    html_keys = set()

    for file_path in HTML_FILES:
        content = read_text(file_path)
        for key in data_i18n.findall(content):
            html_keys.add(key)
        for attr_map in data_i18n_attr.findall(content):
            for entry in attr_map.split("|"):
                if ":" in entry:
                    _, key = entry.split(":", 1)
                    html_keys.add(key)
    return html_keys


def extract_js_dictionary_keys():
    # Keys are intentionally formatted as 6-space indented fields in js/main.js
    pattern = re.compile(r"^\s{6}([a-z0-9_]+):", re.MULTILINE)
    content = read_text(JS_MAIN)
    return set(pattern.findall(content))


def write_csv(path: Path, rows):
    if not rows:
        return
    fieldnames = list(rows[0].keys())
    with path.open("w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def make_overview_rows(html_keys, js_keys):
    return [
        {
            "section": "Summary",
            "metric": "Implementation status",
            "value": "Active on all pages",
            "evidence": "js/main.js + script tag in all html pages",
        },
        {
            "section": "Summary",
            "metric": "HTML wired keys",
            "value": str(len(html_keys)),
            "evidence": "data-i18n + data-i18n-attr usage",
        },
        {
            "section": "Summary",
            "metric": "JS dictionary keys",
            "value": str(len(js_keys)),
            "evidence": "translations.en/ka key sets",
        },
        {
            "section": "Summary",
            "metric": "Coverage parity",
            "value": f"{len(html_keys.intersection(js_keys))}/{len(html_keys)} keys mapped",
            "evidence": "inventory comparison",
        },
        {
            "section": "Architecture",
            "metric": "Storage",
            "value": "localStorage key: softon_language",
            "evidence": "js/main.js",
        },
        {
            "section": "Architecture",
            "metric": "Current languages",
            "value": "en, ka",
            "evidence": "translations object",
        },
        {
            "section": "Architecture",
            "metric": "Attribute translation",
            "value": "Supported via data-i18n-attr",
            "evidence": "applyLanguage()",
        },
    ]


def make_functions_rows():
    return [
        {
            "function": "translations",
            "purpose": "Holds EN/KA text maps",
            "inputs": "language code + key",
            "outputs": "translated strings",
            "location": "js/main.js:8",
            "extension_rule": "Add same key to en and ka",
        },
        {
            "function": "flags",
            "purpose": "Configures flag icon shown in toggle",
            "inputs": "next language",
            "outputs": "img src/alt",
            "location": "js/main.js:151",
            "extension_rule": "Add new language flag if expanding locales",
        },
        {
            "function": "closeMenu()",
            "purpose": "Closes mobile nav state",
            "inputs": "none",
            "outputs": "header class + aria-expanded reset",
            "location": "js/main.js:156",
            "extension_rule": "Keep when nav behavior changes",
        },
        {
            "function": "applyLanguage(language)",
            "purpose": "Applies i18n to text + attributes",
            "inputs": "language string",
            "outputs": "DOM text/attr updates + localStorage save",
            "location": "js/main.js:162",
            "extension_rule": "Do not bypass; always call after language change",
        },
        {
            "function": "[data-i18n] loop",
            "purpose": "Translates element textContent",
            "inputs": "DOM nodes with data-i18n",
            "outputs": "Replaced text",
            "location": "js/main.js:168",
            "extension_rule": "Use for headings/buttons/labels",
        },
        {
            "function": "[data-i18n-attr] loop",
            "purpose": "Translates attributes (placeholder/aria-label/etc)",
            "inputs": "attr:key pairs",
            "outputs": "Replaced attribute values",
            "location": "js/main.js:174",
            "extension_rule": "Format attr map as attr:key|attr2:key2",
        },
        {
            "function": "langToggle click handler",
            "purpose": "Switches en<->ka and reapplies",
            "inputs": "click",
            "outputs": "Language toggle + persistence",
            "location": "js/main.js:215",
            "extension_rule": "Update if adding >2 languages",
        },
    ]


def make_workflow_rows():
    return [
        {
            "step": 1,
            "action": "Tag new element in HTML",
            "example": 'data-i18n="new_key"',
            "validation": "Element has translation key",
        },
        {
            "step": 2,
            "action": "For attributes use data-i18n-attr",
            "example": 'data-i18n-attr="placeholder:new_key"',
            "validation": "Attribute updates on toggle",
        },
        {
            "step": 3,
            "action": "Add key to translations.en",
            "example": 'new_key: "English text"',
            "validation": "No undefined key in EN",
        },
        {
            "step": 4,
            "action": "Add same key to translations.ka",
            "example": 'new_key: "ქართული ტექსტი"',
            "validation": "No undefined key in KA",
        },
        {
            "step": 5,
            "action": "Toggle language and refresh",
            "example": "Click lang button + reload",
            "validation": "Text changes and persists",
        },
        {
            "step": 6,
            "action": "Check inventory report",
            "example": "reports/i18n_key_inventory.csv",
            "validation": "All keys status = OK",
        },
    ]


def make_inventory_rows(html_keys, js_keys):
    all_keys = sorted(html_keys.union(js_keys))
    rows = []
    for key in all_keys:
        in_html = key in html_keys
        in_js = key in js_keys
        if in_html and in_js:
            status = "OK"
        elif in_html:
            status = "Missing in JS"
        else:
            status = "Unused in HTML"
        rows.append(
            {
                "key": key,
                "in_html": str(in_html),
                "in_js_dictionary": str(in_js),
                "status": status,
            }
        )
    return rows


def col_letters(idx: int) -> str:
    result = ""
    while idx > 0:
        idx, rem = divmod(idx - 1, 26)
        result = chr(65 + rem) + result
    return result


def col_width(chars: int) -> int:
    return max(10, min(60, chars + 2))


def style_for_cell(sheet_name, row_idx, col_idx, value):
    # styles: 0 default, 1 header, 2 body_even, 3 body_odd, 4 ok, 5 missing, 6 unused
    if row_idx == 1:
        return 1
    if sheet_name == "Key Inventory" and col_idx == 4:
        if value == "OK":
            return 4
        if value == "Missing in JS":
            return 5
        if value == "Unused in HTML":
            return 6
    return 2 if row_idx % 2 == 0 else 3


def make_sheet_xml(sheet_name, rows):
    if not rows:
        rows = [[""]]

    max_cols = max(len(r) for r in rows)
    max_rows = len(rows)
    normalized = [r + [""] * (max_cols - len(r)) for r in rows]

    col_max = [0] * max_cols
    for row in normalized:
        for i, val in enumerate(row):
            col_max[i] = max(col_max[i], len(str(val)))

    dim = f"A1:{col_letters(max_cols)}{max_rows}"
    out = []
    out.append('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>')
    out.append('<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">')
    out.append(f'<dimension ref="{dim}"/>')
    out.append(
        '<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" '
        'activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>'
    )
    out.append("<cols>")
    for i, width in enumerate(col_max, start=1):
        out.append(f'<col min="{i}" max="{i}" width="{col_width(width)}" customWidth="1"/>')
    out.append("</cols>")
    out.append("<sheetData>")
    for r_idx, row in enumerate(normalized, start=1):
        out.append(f'<row r="{r_idx}" ht="20" customHeight="1">')
        for c_idx, val in enumerate(row, start=1):
            ref = f"{col_letters(c_idx)}{r_idx}"
            text = escape(str(val))
            style = style_for_cell(sheet_name, r_idx, c_idx, str(val))
            out.append(
                f'<c r="{ref}" s="{style}" t="inlineStr"><is><t xml:space="preserve">{text}'
                "</t></is></c>"
            )
        out.append("</row>")
    out.append("</sheetData>")
    out.append(f'<autoFilter ref="{dim}"/>')
    out.append("</worksheet>")
    return "".join(out)


def write_xlsx(sheet_data, out_path: Path):
    styles_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="2">
    <font><sz val="11"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font>
    <font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font>
  </fonts>
  <fills count="7">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF1F4E78"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFF7FAFC"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFEAF4EA"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFFEFEF"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFFF8E6"/><bgColor indexed="64"/></patternFill></fill>
  </fills>
  <borders count="2">
    <border><left/><right/><top/><bottom/><diagonal/></border>
    <border>
      <left style="thin"><color rgb="FFD9E2EC"/></left>
      <right style="thin"><color rgb="FFD9E2EC"/></right>
      <top style="thin"><color rgb="FFD9E2EC"/></top>
      <bottom style="thin"><color rgb="FFD9E2EC"/></bottom>
      <diagonal/>
    </border>
  </borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="7">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="left" vertical="top" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="3" borderId="1" xfId="0" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="left" vertical="top" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="4" borderId="1" xfId="0" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="0" fillId="5" borderId="1" xfId="0" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="0" fillId="6" borderId="1" xfId="0" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
  </cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>"""

    content_types = [
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">',
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>',
        '<Default Extension="xml" ContentType="application/xml"/>',
        '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>',
        '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>',
    ]
    for i in range(1, len(sheet_data) + 1):
        content_types.append(
            f'<Override PartName="/xl/worksheets/sheet{i}.xml" '
            'ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
        )
    content_types.append("</Types>")
    content_types_xml = "".join(content_types)

    rels_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>"""

    sheet_tags = []
    for i, (name, _) in enumerate(sheet_data, start=1):
        sheet_tags.append(f'<sheet name="{escape(name)}" sheetId="{i}" r:id="rId{i}"/>')

    workbook_xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        '<bookViews><workbookView xWindow="0" yWindow="0" windowWidth="22000" windowHeight="12000"/></bookViews>'
        f"<sheets>{''.join(sheet_tags)}</sheets></workbook>"
    )

    wb_rels = [
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">',
    ]
    for i in range(1, len(sheet_data) + 1):
        wb_rels.append(
            f'<Relationship Id="rId{i}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" '
            f'Target="worksheets/sheet{i}.xml"/>'
        )
    wb_rels.append(
        f'<Relationship Id="rId{len(sheet_data) + 1}" '
        'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" '
        'Target="styles.xml"/>'
    )
    wb_rels.append("</Relationships>")
    workbook_rels_xml = "".join(wb_rels)

    with zipfile.ZipFile(out_path, "w", compression=zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", content_types_xml)
        z.writestr("_rels/.rels", rels_xml)
        z.writestr("xl/workbook.xml", workbook_xml)
        z.writestr("xl/_rels/workbook.xml.rels", workbook_rels_xml)
        z.writestr("xl/styles.xml", styles_xml)
        for i, (sheet_name, rows) in enumerate(sheet_data, start=1):
            z.writestr(f"xl/worksheets/sheet{i}.xml", make_sheet_xml(sheet_name, rows))


def csv_rows_from_dicts(dict_rows):
    if not dict_rows:
        return [[]]
    header = list(dict_rows[0].keys())
    rows = [header]
    for row in dict_rows:
        rows.append([row[h] for h in header])
    return rows


def generate_reports():
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    html_keys = extract_html_keys()
    js_keys = extract_js_dictionary_keys()

    overview = make_overview_rows(html_keys, js_keys)
    functions = make_functions_rows()
    inventory = make_inventory_rows(html_keys, js_keys)
    workflow = make_workflow_rows()

    write_csv(REPORTS_DIR / "i18n_report_overview.csv", overview)
    write_csv(REPORTS_DIR / "i18n_functions_report.csv", functions)
    write_csv(REPORTS_DIR / "i18n_key_inventory.csv", inventory)
    write_csv(REPORTS_DIR / "i18n_implementation_workflow.csv", workflow)

    sheet_data = [
        ("Overview", csv_rows_from_dicts(overview)),
        ("Functions", csv_rows_from_dicts(functions)),
        ("Key Inventory", csv_rows_from_dicts(inventory)),
        ("Workflow", csv_rows_from_dicts(workflow)),
    ]
    write_xlsx(sheet_data, REPORTS_DIR / "i18n_report_workbook.xlsx")

    return html_keys, js_keys


def main():
    html_keys, js_keys = generate_reports()
    print(f"Generated i18n reports. HTML keys: {len(html_keys)} | JS keys: {len(js_keys)}")


if __name__ == "__main__":
    main()
