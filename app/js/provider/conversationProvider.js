/*global angular, cordova, Media*/
angular.module("gessami")
    .provider("ConversationProvider", function () {
        "use strict";

        this.$get = function () {
            return {
                recordConversation: function (duration, successHandler, errorHandler) {
                    if (cordova && cordova.file && cordova.file.dataDirectory && Media) {
                        var conversationFileName = "conversation-",
                            conversationFile,
                            conversationDate = new Date();

                        conversationFileName += conversationDate.getFullYear() + "-";
                        conversationFileName += ((conversationDate.getMonth() + 1).toString().length === 1 ? "0" + (conversationDate.getMonth() + 1) : conversationDate.getMonth()) + "-";
                        conversationFileName += (conversationDate.getDate().toString().length === 1 ? "0" + conversationDate.getDate() : conversationDate.getDate()) + "-";
                        conversationFileName += (conversationDate.getHours().toString().length === 1 ? "0" + conversationDate.getHours() : conversationDate.getHours()) + "-";
                        conversationFileName += (conversationDate.getMinutes().toString().length === 1 ? "0" + conversationDate.getMinutes() : conversationDate.getMinutes()) + "-";
                        conversationFileName += (conversationDate.getSeconds().toString().length === 1 ? "0" + conversationDate.getSeconds() : conversationDate.getSeconds()) + ".mp3";

                        conversationFile = new Media(
                            conversationFileName,
                            function (successState) {
                                successHandler();
                            },
                            function (errorState) {
                                errorHandler("Error when recording conversation: " + errorState.code);
                            }
                        );

                        conversationFile.startRecord();

                        setTimeout(function () {
                            conversationFile.stopRecord();
                        }, duration);
                    } else {
                        errorHandler("Recording capability is not available");
                    }
                }
            };
        };
    });
