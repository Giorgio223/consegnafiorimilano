#!/usr/bin/env python3
"""Create a complete clean ZIP and verify original non-SEO project files byte-for-byte."""
import sys, pathlib, zipfile, hashlib, json, shutil
root=pathlib.Path(sys.argv[1]).resolve(); original=pathlib.Path(sys.argv[2]); out=pathlib.Path(sys.argv[3]); report=root/'SEO-V2-VALIDATION.json'
exclude={'node_modules','.next','.git','__pycache__'}
for p in list(root.rglob('*')):
    if p.is_dir() and p.name in exclude and p.exists(): shutil.rmtree(p)
changed=[]; missing=[]; same=0
with zipfile.ZipFile(original) as z:
    for info in z.infolist():
        if info.is_dir():continue
        rel=pathlib.PurePosixPath(info.filename).parts[1:]
        if any(x in exclude for x in rel):continue
        p=root.joinpath(*rel)
        if not p.is_file():missing.append('/'.join(rel));continue
        with z.open(info) as f:
            h=hashlib.file_digest(f,'sha256').hexdigest()
        with p.open('rb') as f:
            h2=hashlib.file_digest(f,'sha256').hexdigest()
        if h!=h2:changed.append('/'.join(rel))
        else:same+=1
assert not missing,missing
assert set(changed)<= {'data/landing-advice.ts','data/landing-topics.ts','components/LandingPage.tsx'},changed
r=json.loads(report.read_text());r['original_files_unchanged']=same;r['original_files_changed']=sorted(changed);r['original_files_missing']=missing;r['excluded_directories']=sorted(exclude);report.write_text(json.dumps(r,ensure_ascii=False,indent=2),encoding='utf-8')
if out.exists():out.unlink()
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED,compresslevel=3) as z:
    for p in sorted(root.rglob('*')):
        if p.is_file() and not any(x in exclude for x in p.relative_to(root).parts):z.write(p,str(pathlib.PurePosixPath(root.name)/p.relative_to(root)))
with zipfile.ZipFile(out) as z:
    assert z.testzip() is None
    assert all(not set(pathlib.PurePosixPath(n).parts)&exclude for n in z.namelist())
    print('ZIP verified:',len(z.namelist()),'files;',out.stat().st_size,'bytes;',same,'original files unchanged;',changed)
