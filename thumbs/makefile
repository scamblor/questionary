IMAGE_DIR=../images
THUMB_DIR=.
CONVERT=convert.exe
OPTIPNG=optipng -quiet -o 6

THUMB_SIZE=240x180\>

# --------------------------------------------------------------------
# THUMBNAILS
#
THUMBS=$(foreach f, $(wildcard $(IMAGE_DIR)/*.jpg) $(wildcard $(IMAGE_DIR)/*.png), $(THUMB_DIR)/$(notdir $f))

$(THUMB_DIR)/%.png: $(IMAGE_DIR)/%.png
	$(CONVERT) $<  -strip -resize $(THUMB_SIZE) $@
	$(OPTIPNG) $@

$(THUMB_DIR)/%.jpg: $(IMAGE_DIR)/%.jpg
	$(CONVERT) $<  -strip -resize $(THUMB_SIZE) $@


# --------------------------------------------------------------------
# ALL FILES
#
.PHONY: all clean
all: \
	$(THUMBS)

clean:
	rm -f $(THUMBS)

