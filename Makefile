.PHONY: all clean build build-debug build-dependencies

# Enable some extra debugging in own metalsmith plugins
#NODE_DEBUG := metalsmith-external-links
#NODE_DEBUG := metalsmith-autoexclude-permalinks
#NODE_DEBUG := metalsmith-auto-defaults

all: build


# In release.mk, you can define targets for pushing the built website to the server.
# For debugging purposes, you can set DEBUG_URL to point to a different url,
# in order to make inner-site links work.

-include release.mk



# We extract SchildiChat-Android screenshots from its git repo
SCHILDI_REPO ?= ~/AndroidStudioProjects/SchildiChat-android
SCHILDI_PICS_SRC_DIR := $(SCHILDI_REPO)/fastlane/metadata/android/en-US/images/phoneScreenshots/
SCHILDI_PICS_NOPATH := 2_en-US.png 3_en-US.png 4_en-US.png
SCHILDI_PICS_SRC := $(addprefix $(SCHILDI_PICS_SRC_DIR)/, $(SCHILDI_PICS_NOPATH))
SCHILDI_PICS_TARGET_DIR := src/android
SCHILDI_PICS := $(addprefix $(SCHILDI_PICS_TARGET_DIR)/, $(SCHILDI_PICS_NOPATH))

$(SCHILDI_PICS_TARGET_DIR)/%.png: $(SCHILDI_PICS_SRC_DIR)/%.png
	cp $< $@

# Add files that need rules to be run before metalsmith here.
GENERATED_SRC := $(SCHILDI_PICS)

build-dependencies: $(GENERATED_SRC)

build: build-dependencies
	node index

build-debug: build-dependencies
	DEBUG=$(NODE_DEBUG) node index $(DEBUG_URL)

clean:
	rm -rf build build-layouts $(GENERATED_SRC)
