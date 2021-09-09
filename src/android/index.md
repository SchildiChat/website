---
title: SchildiChat for Android
nav_name: Android
order_id: 10
is_subpage: false
fdroid_download_link: https://f-droid.org/de/packages/de.spiritcroc.riotx/
direct_download_app_name: SchildiChat
github_src_link: https://github.com/SchildiChat/SchildiChat-android
---

SchildiChat for Android is a Matrix Client based on [Element Android](https://github.com/vector-im/riotX-android).

Compared to the Element app, SchildiChat features following changes:
- Unified chat list for both direct and group chats
- Message bubbles
- Further usability improvements and additional settings to configure the app


## Screenshots

<div class="screenshot-container">
<!--
<img alt="Screenshot" src="android/1_en-US.png" class="phone_screenshot" onclick="window.open(src, '_self');" />
-->
<a href="img/2_en-US.png" class="phone-screenshot"><img alt="Screenshot" src="img/2_en-US.png"></a>
<a href="img/3_en-US.png" class="phone-screenshot"><img alt="Screenshot" src="img/3_en-US.png"></a>
<a href="img/4_en-US.png" class="phone-screenshot"><img alt="Screenshot" src="img/4_en-US.png"></a>
</div>


## Where can I get it?


### Google Play Store

You can find SchildiChat in the Google Play Store [here](https://play.google.com/store/apps/details?id=de.spiritcroc.riotx).


### F-Droid

The **FOSS variant** (without closed-source code) is available from the [official F-Droid repository](https://f-droid.org/de/packages/de.spiritcroc.riotx/).
However, this variant **does not support Google/FCM push notifications**, and thus might feature increased battery drain and a higher delay for delivering messages.
Since the official F-Droid repository can be slow for updates, you can also use the [SpiritCroc F-Droid repository](install-from-sc-fdroid-foss) to get new releases sooner.

If you prefer the **variant that features push notifications**, you can get it either from the [Google Play Store](https://play.google.com/store/apps/details?id=de.spiritcroc.riotx) or the [SpiritCroc F-Droid repository](install-from-sc-fdroid-fcm).
If you already installed SchildiChat from the Google Play Store, but want to update the app without re-installing using F-Droid, follow the instructions how to do this with the same repository [here](install-from-sc-fdroid).


### Direct download

If neither Google Play nor F-Droid work for you, you can also download the latest version
- **with** push notifications from the [SpiritCroc F-Droid repository](https://s2.spiritcroc.de/fdroid/SchildiChat.apk)
- **without** push notifications from the [official F-Droid repository](https://f-droid.org/en/packages/de.spiritcroc.riotx/) _(scroll down)_


### Test versions

If you want to help testing new releases and don't mind some extra bugs,
you can get beta-versions for both the Google- and the FOSS-variant from the [SpiritCroc test-builds F-Droid repository](https://s2.spiritcroc.de/testing/fdroid/repo?fingerprint=52d03f2fab785573bb295c7ab270695e3a1bdd2adc6a6de8713250b33f231225).

The beta releases come with their own package-id, so you can install both alongside to the stable version.
After adding above repo to F-Droid, you should be able to find following apps:

- SchildiChat.Beta[g]: This is the Google variant with push notifications,
- SchildiChat.Beta[f]: This is the FOSS variant, as found in the official F-Droid repository.

When reporting bugs related to test versions (and thus not existing on stable versions), make sure to mention the full version name, as found in the app's about screen!


## Get in touch
Feel free to [join the discussion on matrix](https://matrix.to/#/#schildichat-android:matrix.org).
