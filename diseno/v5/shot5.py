from playwright.sync_api import sync_playwright
import os
d=os.getcwd()
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/usr/bin/google-chrome')
  for w,tag in [(390,'mobile'),(1440,'desktop')]:
    pg=b.new_page(viewport={'width':w,'height':844 if w==390 else 900})
    for n in ['home','listado-ciudad','listado-barrio','ficha-basica','ficha-verificada','ficha-minima','estados']:
      pg.goto(f'file://{d}/mockups/{n}.html'); pg.wait_for_timeout(1500); pg.screenshot(path=f'png/{n}-{tag}.png',full_page=True)
  b.close()
