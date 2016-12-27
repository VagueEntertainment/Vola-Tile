# Add more folders to ship with the application, here
folder_01.source = qml/Vola-Tile
folder_01.target = qml
DEPLOYMENTFOLDERS = folder_01

# Additional import path used to resolve QML modules in Creator's code model
QML_IMPORT_PATH =
QT += multimedia sql


# The .cpp file which was generated for your project. Feel free to hack it.
SOURCES += main.cpp

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
        $$PWD/../../../../Qt/5.3/android_armv7/lib/libQt5AndroidExtras.so \
        $$PWD/../../../../Qt/5.3/android_armv7/lib/libQt5Core.so \
        $$PWD/../../../../Qt/5.3/android_armv7/lib/libQt5Gui.so \
        $$PWD/../../../../Qt/5.3/android_armv7/lib/libQt5Multimedia.so \
        $$PWD/../../../../Qt/5.3/android_armv7/lib/libQt5MultimediaQuick_p.so \
        $$PWD/../../../../Qt/5.3/android_armv7/lib/libQt5MultimediaWidgets.so \
        $$PWD/../../../../Qt/5.3/android_armv7/lib/libQt5Network.so \
        $$PWD/../../../../Qt/5.3/android_armv7/lib/libQt5OpenGL.so \
        $$PWD/../../../../Qt/5.3/android_armv7/lib/libQt5Qml.so \
        $$PWD/../../../../Qt/5.3/android_armv7/lib/libQt5Quick.so \
        $$PWD/../../../../Qt/5.3/android_armv7/lib/libQt5QuickParticles.so \
        $$PWD/../../../../Qt/5.3/android_armv7/lib/libQt5Sql.so \
        $$PWD/../../../../Qt/5.3/android_armv7/lib/libQt5Xml.so \
        $$PWD/../../../../Qt/5.3/android_armv7/lib/libQt5XmlPatterns.so
}

DISTFILES += \
    Vola-Tile.json \
    Vola-Tile.desktop \
    Vola-Tile.apparmor \
    manifest.json
