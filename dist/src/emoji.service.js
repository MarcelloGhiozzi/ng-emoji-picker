"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var emoji_db_1 = require("./emoji.db");
var EmojiService = /** @class */ (function () {
    function EmojiService() {
        this.PARSE_REGEX = /:([a-zA-Z0-9_\-\+]+):/g;
    }
    EmojiService.prototype.get = function (emoji) {
        // TODO Fix performance
        for (var _i = 0, EMOJI_DB_1 = emoji_db_1.EMOJI_DB; _i < EMOJI_DB_1.length; _i++) {
            var data = EMOJI_DB_1[_i];
            for (var _a = 0, _b = data.aliases; _a < _b.length; _a++) {
                var e = _b[_a];
                if (emoji === e) {
                    return data.emoji;
                }
            }
        }
        return emoji;
    };
    EmojiService.prototype.getAll = function () {
        return emoji_db_1.EMOJI_DB.filter(function (emojiData) { return !!emojiData.emoji; });
    };
    EmojiService.prototype.emojify = function (str) {
        var _this = this;
        return str.split(this.PARSE_REGEX).map(function (emoji, index) {
            // Return every second element as an emoji
            if (index % 2 === 0) {
                return emoji;
            }
            return _this.get(emoji);
        }).join('');
    };
    EmojiService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    EmojiService.ctorParameters = function () { return []; };
    return EmojiService;
}());
exports.EmojiService = EmojiService;
//# sourceMappingURL=emoji.service.js.map