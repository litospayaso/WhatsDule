/*global require, console*/
var gulp = require("gulp"),
    webserver = require("gulp-webserver"),
    jsHint = require("gulp-jshint"),
    jsLint = require("gulp-jslint"),
    gjsLint = require("gulp-gjslint");

// Servidor web de desarrollo
gulp.task("dev-server", function () {
    "use strict";

    gulp.src("./app")
        .pipe(webserver({
            open: true,
            livereload: true
        }));
});

// Servidor web para probar versión de Apache Cordova
gulp.task("cordova-server", function () {
    "use strict";

    gulp.src("./www")
        .pipe(webserver({
            open: true,
            livereload: true
        }));
});

// Busca errores de JavaScript de acuerdo con JsLint
gulp.task("jsLint", function () {
    "use strict";

    return gulp.src(["./app/js/**/*.js"])
        .pipe(jsLint())
        .on("error", function (error) {
            console.error(String(error));
        });
});

// Busca errores de JavaScript de acuerdo con JsHint
gulp.task("jsHint", function () {
    "use strict";

    return gulp.src(["./app/js/**/*.js"])
        .pipe(jsHint(".jshintrc"))
        .pipe(jsHint.reporter("default"));
});

// Busca errores de JavaScript de acuerdo con Google JsLinter
gulp.task("jsGoogleLint", function () {
    "use strict";

    return gulp.src(["./app/js/**/*.js"])
        .pipe(gjsLint())
        .pipe(gjsLint.reporter("console"), {
            fail: true
        });
});

// Copia el contenido de app/ en www/ para probar la aplicación con Apache Cordova
gulp.task("cordovaDev", function () {
    "use strict";

    gulp.src("./app/**/*")
        .pipe(gulp.dest("./www/"));
});

gulp.task("default", ["dev-server"]);
