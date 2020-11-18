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
ANDRO_SCHILDI_REPO ?= ~/AndroidStudioProjects/SchildiChat-android
ANDRO_SCHILDI_PICS_SRC_DIR := $(ANDRO_SCHILDI_REPO)/fastlane/metadata/android/en-US/images/phoneScreenshots/
ANDRO_SCHILDI_PICS_NOPATH := 2_en-US.png 3_en-US.png 4_en-US.png
ANDRO_SCHILDI_PICS_SRC := $(addprefix $(ANDRO_SCHILDI_PICS_SRC_DIR)/, $(ANDRO_SCHILDI_PICS_NOPATH))
ANDRO_SCHILDI_PICS_TARGET_DIR := src/android/img
ANDRO_SCHILDI_PICS := $(addprefix $(ANDRO_SCHILDI_PICS_TARGET_DIR)/, $(ANDRO_SCHILDI_PICS_NOPATH))

$(ANDRO_SCHILDI_PICS_TARGET_DIR)/%.png: $(ANDRO_SCHILDI_PICS_SRC_DIR)/%.png
	cp $< $@



# We extract SchildiChat-Web/-Desktop screenshots from its git repo
WEB_SCHILDI_REPO ?= ~/git/schildichat-desktop
WEB_SCHILDI_PICS_SRC_DIR := $(WEB_SCHILDI_REPO)/screenshots/
WEB_SCHILDI_PICS_NOPATH := 1.png
WEB_SCHILDI_PICS_SRC := $(addprefix $(WEB_SCHILDI_PICS_SRC_DIR)/, $(WEB_SCHILDI_PICS_NOPATH))
WEB_SCHILDI_PICS_TARGET_DIR := src/desktop/img
WEB_SCHILDI_PICS := $(addprefix $(WEB_SCHILDI_PICS_TARGET_DIR)/, $(WEB_SCHILDI_PICS_NOPATH))

$(WEB_SCHILDI_PICS_TARGET_DIR)/%.png: $(WEB_SCHILDI_PICS_SRC_DIR)/%.png
	cp $< $@

# Add files that need rules to be run before metalsmith here.
GENERATED_SRC := $(ANDRO_SCHILDI_PICS) $(WEB_SCHILDI_PICS)

build-dependencies: $(GENERATED_SRC)

build: build-dependencies
	node index

build-debug: build-dependencies
	DEBUG=$(NODE_DEBUG) node index $(DEBUG_URL)

clean:
	rm -rf build build-layouts $(GENERATED_SRC)
