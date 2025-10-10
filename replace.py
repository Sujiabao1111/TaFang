import os
import shutil

hash = '00000'
setting_file = ''
for file in os.listdir("./build/web-mobile/src"):
    if file.endswith(".js"):
        axr = file.split(".")
        setting_file = file
        if len(axr)>2:
          hash = axr[1]

if hash=='00000':
    shutil.copyfile('./build/web-mobile/src/{}'.format(setting_file), './build/web-mobile/src/settings.{}.js'.format(hash))

# Read in the file
with open('./build/web-mobile/index.html', 'r') as file:
  filedata = file.read()

# Replace the target string
filedata = filedata.replace('<title>Cocos Creator | Car_master</title>', '<title>Car_master</title>')
# heaer_add = """<meta name="format-detection" content="telephone=no">
#   <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
#   <meta http-equiv="Pragma" content="no-cache" />
#   <meta http-equiv="Expires" content="0" />
# """
# filedata = filedata.replace('<meta name="format-detection" content="telephone=no">', heaer_add)

sx = """<!-- inject window.Telegram.WebApp object ken change here to replace 02 -->
<div id="ton-connect" style="display:none"></div>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script>
  // init twa and expand view
  if(Telegram!==undefined)
  {{Telegram.WebApp.ready();Telegram.WebApp.expand();}}
  
</script>
<script src="https://unpkg.com/@tonconnect/ui@latest/dist/tonconnect-ui.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tonweb@0.0.66/dist/tonweb.js"></script>
<script src="./wallet.{}.js" ></script>
<script src="src/settings.{}.js" charset="utf-8"></script>
<script src="https://sad.adsgram.ai/js/sad.min.js"></script>
<script src="https://js.onclckvd.com/in-stream-ad-admanager/tma.js"></script>
<script src='//whephiwums.com/sdk.js' data-zone='9876818' data-sdk='show_9876818'></script>
<script src="./playdeck-web.{}.js" ></script>
<script async src="https://tganalytics.xyz/index.js" onload="initAnalytics()" type="text/javascript"></script>
<script>
    function initAnalytics() {{
    console.log('===============init analytics', window.telegramAnalytics);
      window.telegramAnalytics.init({{
        token: 'eyJhcHBfbmFtZSI6IkdlbUphbSIsImFwcF91cmwiOiJodHRwczovL3QubWUvR2VtSmFtX2JvdCIsImFwcF9kb21haW4iOiJodHRwczovL2Nhci52YXpoZW5pbmEuY29tLzE4Ny9pbmRleC5odG1sIn0=!1V7YRKqC0ntkG72CbLI0Llf+MAvTXH+c9To2JhW2L58=',
        appName: 'GemJam'
      }});
    }}
</script>
""".format(hash,hash,hash)

filedata = filedata.replace('<script src="src/settings.{}.js" charset="utf-8"></script>'.format(hash), sx)

# Write the file out again
with open('./build/web-mobile/index.html', 'w') as file:
  file.write(filedata)

shutil.copyfile('./wallet.js', './build/web-mobile/wallet.{}.js'.format(hash))
shutil.copyfile('./playdeck-web.js', './build/web-mobile/playdeck-web.{}.js'.format(hash))