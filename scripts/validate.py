"""Validate the distributable skill and runnable example without browser claims."""
from pathlib import Path
import re
import subprocess
import yaml

ROOT = Path(__file__).resolve().parents[1]
skill = ROOT / 'skills/immerse-website'
text = (skill / 'SKILL.md').read_text()
assert text.startswith('---\n'), 'SKILL.md needs YAML frontmatter'
frontmatter = yaml.safe_load(text.split('---', 2)[1])
assert frontmatter['name'] == 'immerse-website'
assert isinstance(frontmatter['description'], str) and frontmatter['description'].strip()
metadata = yaml.safe_load((skill / 'agents/openai.yaml').read_text())['interface']
assert 25 <= len(metadata['short_description']) <= 64
assert '$immerse-website' in metadata['default_prompt']
links = 0
for path in ROOT.rglob('*.md'):
    if '.git' in path.relative_to(ROOT).parts:
        continue
    for target in re.findall(r'\]\(([^)]+)\)', path.read_text()):
        if '://' in target or target.startswith(('#', 'mailto:')):
            continue
        destination = target.split('#', 1)[0]
        resolved = (path.parent / destination).resolve()
        assert resolved.is_relative_to(ROOT), f'External local path in {path}: {target}'
        assert resolved.exists(), f'Broken link in {path}: {target}'
        links += 1
for license_path in [
    'LICENSE', 'examples/atelie-brisa/assets/vendor/LICENSE',
    'examples/atelie-brisa/assets/fonts/dmsans-OFL.txt',
    'examples/atelie-brisa/assets/fonts/cormorantgaramond-OFL.txt',
]:
    assert (ROOT / license_path).is_file(), f'Missing license: {license_path}'
example = ROOT / 'examples/atelie-brisa'
modules = sorted([*example.glob('*.js'), *example.glob('*.mjs')])
for module in modules:
    subprocess.run(['node', '--check', str(module)], check=True)
print(f'Valid skill metadata; {links} local links; {len(modules)} JavaScript modules; dependency licenses present.')
