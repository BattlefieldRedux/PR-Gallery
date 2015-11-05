import os, subprocess

for f in os.listdir('Originals/correct'):
	if os.path.isfile('Originals/correct/' + f + '') :
		test = False
		if "albasrah" in f:
			test = True
		if test == False:
			continue
		print f
		outfoldername = os.path.splitext(f)[0].replace(" Kopie", "")
		subprocess.call("python gdal2tiles_new.py -p raster -z 0-5 -w none -r average " + '"Originals/correct/' + f + '"'+ ' "tiles_new/' + outfoldername + '"' , shell=True)
	else:
		print "NONO", f

		
from PIL import Image

for subdir, dirs, files in os.walk("tiles_new"):
	print subdir
	for file in files:
		if os.path.isfile(os.path.join(subdir,file)):
			if file.endswith(".png"):
				im = Image.open(os.path.join(subdir,file))
				filename = os.path.splitext(file)[0]
				im.save(os.path.join(subdir, filename + ".jpg"))
				os.remove(os.path.join(subdir,file))