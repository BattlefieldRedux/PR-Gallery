import os, subprocess
'''
for f in os.listdir('map_source_t'):
	if os.path.isfile('map_source_t/' + f):
		print f
		outfoldername = os.path.splitext(f)[0].replace("_original", "")
		subprocess.call("python gdal2tiles_new.py -p raster -z 0-5 -w none -r average " + 'map_source_t/' + f + " tiles/" + outfoldername , shell=True)
	else:
		print "NONO", f
'''
		
from PIL import Image

for subdir, dirs, files in os.walk("tiles"):
    for file in files:
		if os.path.isfile(os.path.join(subdir,file)):
			if file.endswith(".png"):
				#im = Image.open(os.path.join(subdir,file))
				#filename = os.path.splitext(file)[0]
				#im.save(os.path.join(subdir, filename + ".jpg"))
				os.remove(os.path.join(subdir,file))
				
			
			
'''
for f in os.listdir('tiles'):
	if os.path.isfile('tiles/' + f):
		if f.endswith(".png"):
			im = Image.open("tiles/" + f)
			filename = os.path.splitext(f)[0]
			im.save("tiles/" + filename + ".jpg")
			#bg = Image.new("RGB", im.size, (255,255,255))
			#bg.paste(im,im)
			#bg.save("tiles/" + filename + ".jpg")
'''