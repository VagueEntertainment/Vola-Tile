# Add more folders to ship with the application, here
folder_01.source = qml/Vola-Tile
folder_01.target = qml
DEPLOYMENTFOLDERS = folder_01

# Additional import path used to resolve QML modules in Creator's code model
QML_IMPORT_PATH =
QT += multimedia sql


# The .cpp file which was generated for your project. Feel free to hack it.
SOURCES += main.cpp \
    qtquick2applicationviewer/qtquick2applicationviewer.cpp \
    main.cpp \
    moc_qtquick2applicationviewer.cpp

# Installation path
# target.path =

# Please do not modify the following two lines. Required for deployment.
include(qtquick2applicationviewer/qtquick2applicationviewer.pri)
qtcAddDeployment()

ANDROID_PACKAGE_SOURCE_DIR = $$PWD/android

OTHER_FILES +=

#ANDROID_EXTRA_LIBS = ../../../../../../opt/Qt5.2.1/5.2.1/android_armv7/lib/libQt5Multimedia.so ../../../../../../opt/Qt5.2.1/5.2.1/android_armv7/lib/libQt5Quick.so ../../../../../../opt/Qt5.2.1/5.2.1/android_armv7/lib/libQt5Qml.so ../../../../../../opt/Qt5.2.1/5.2.1/android_armv7/lib/libQt5OpenGL.so ../../../../../../opt/Qt5.2.1/5.2.1/android_armv7/lib/libQt5Gui.so ../../../../../../opt/Qt5.2.1/5.2.1/android_armv7/lib/libQt5Network.so ../../../../../../opt/Qt5.2.1/5.2.1/android_armv7/lib/libQt5Sql.so ../../../../../../opt/Qt5.2.1/5.2.1/android_armv7/lib/libQt5Xml.so ../../../../../../opt/Qt5.2.1/5.2.1/android_armv7/lib/libQt5Core.so ../../../../../../opt/Qt5.2.1/5.2.1/android_armv7/lib/libQt5Widgets.so ../../../../../../opt/Qt5.2.1/5.2.1/android_armv7/plugins/mediaservice/libqtmedia_android.so ../../../../../../opt/Qt5.2.1/5.2.1/android_armv7/plugins/sqldrivers/libqsqlite.so ../../../../../../opt/Qt5.2.1/5.2.1/android_armv7/lib/libQt5AndroidExtras.so

contains(ANDROID_TARGET_ARCH,armeabi-v7a) {
    ANDROID_EXTRA_LIBS = \
        /home/benjamin/Projects/Vola-Tile/../../../../Qt/5.3/android_armv7/lib/libQt5AndroidExtras.so \
        /home/benjamin/Projects/Vola-Tile/../../../../Qt/5.3/android_armv7/lib/libQt5Core.so \
        /home/benjamin/Projects/Vola-Tile/../../../../Qt/5.3/android_armv7/lib/libQt5Gui.so \
        /home/benjamin/Projects/Vola-Tile/../../../../Qt/5.3/android_armv7/lib/libQt5Multimedia.so \
        /home/benjamin/Projects/Vola-Tile/../../../../Qt/5.3/android_armv7/lib/libQt5MultimediaQuick_p.so \
        /home/benjamin/Projects/Vola-Tile/../../../../Qt/5.3/android_armv7/lib/libQt5MultimediaWidgets.so \
        /home/benjamin/Projects/Vola-Tile/../../../../Qt/5.3/android_armv7/lib/libQt5Network.so \
        /home/benjamin/Projects/Vola-Tile/../../../../Qt/5.3/android_armv7/lib/libQt5OpenGL.so \
        /home/benjamin/Projects/Vola-Tile/../../../../Qt/5.3/android_armv7/lib/libQt5Qml.so \
        /home/benjamin/Projects/Vola-Tile/../../../../Qt/5.3/android_armv7/lib/libQt5Quick.so \
        /home/benjamin/Projects/Vola-Tile/../../../../Qt/5.3/android_armv7/lib/libQt5QuickParticles.so \
        /home/benjamin/Projects/Vola-Tile/../../../../Qt/5.3/android_armv7/lib/libQt5Sql.so \
        /home/benjamin/Projects/Vola-Tile/../../../../Qt/5.3/android_armv7/lib/libQt5Xml.so \
        /home/benjamin/Projects/Vola-Tile/../../../../Qt/5.3/android_armv7/lib/libQt5XmlPatterns.so \
        $$PWD/../../Android/openssl/libcrypto.so \
        $$PWD/../../Android/openssl/libssl.so
}

DISTFILES += \
    Vola-Tile.json \
    Vola-Tile.desktop \
    Vola-Tile.apparmor \
    manifest.json \
    android/AndroidManifest.xml \
    android/res/drawable-hdpi/icon.png \
    android/res/drawable-ldpi/icon.png \
    android/res/drawable-mdpi/icon.png

HEADERS += \
    qtquick2applicationviewer/qtquick2applicationviewer.h
