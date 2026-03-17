import re
from pathlib import Path

path = Path(__file__).resolve().parents[1] / 'ArthQuest_v2.html'
text = path.read_text(encoding='utf-8')

# Remove stray CSS block after linking to external stylesheet.
marker = '<link rel="stylesheet" href="css/style.css">'
if marker in text:
    parts = text.split(marker)
    before = parts[0] + marker
    after = marker.join(parts[1:])
    # Remove everything between the marker and </head>
    if '</head>' in after:
        after = after.split('</head>', 1)[1]
        text = before + '\n' + '</head>' + after

# Replace inline <script> ... </script> with external script include
script_start = text.find('<script>')
script_end = text.rfind('</script>')
if script_start != -1 and script_end != -1 and script_end > script_start:
    # keep any whitespace/newlines around
    text = text[:script_start] + '<script defer src="js/app.js"></script>\n' + text[script_end+len('</script>'):]

path.write_text(text, encoding='utf-8')
print('Updated', path)
