"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var emoji_service_1 = require("../emoji.service");
var EmojiInputComponent = /** @class */ (function () {
    function EmojiInputComponent(emojiService) {
        this.emojiService = emojiService;
        this.popupAnchor = 'top';
        this.inputClass = '';
        this.searchClass = '';
        this.onEnter = function () { };
        this.model = '';
        this.autofocus = false;
        this.closeAfterSelection = true;
        this.modelChange = new core_1.EventEmitter();
        this.setPopupAction = new core_1.EventEmitter();
        this.blur = new core_1.EventEmitter();
        this.focus = new core_1.EventEmitter();
        this.keyup = new core_1.EventEmitter();
        this.emojiClick = new core_1.EventEmitter();
        this.input = '';
        this.filterEmojis = '';
        this.popupOpen = false;
        this.lastCursorPosition = 0;
    }
    EmojiInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.setPopupAction) {
            this.setPopupAction.emit(function (status) { _this.openPopup(status); });
        }
        this.allEmojis = this.emojiService.getAll();
        this.clean();
    };
    EmojiInputComponent.prototype.ngAfterViewInit = function () {
        if (this.autofocus) {
            if (this.textArea) {
                this.textareaEl.nativeElement.focus();
            }
            else {
                this.inputEl.nativeElement.focus();
            }
        }
    };
    EmojiInputComponent.prototype.ngOnChanges = function () {
        if (this.model !== this.input) {
            this.input = this.model;
        }
    };
    EmojiInputComponent.prototype.onKeyup = function (event) {
        this.updateCursor();
        if (this.keyup) {
            this.keyup.emit(event);
        }
    };
    EmojiInputComponent.prototype.onBlur = function (event) {
        this.updateCursor();
        if (this.blur) {
            this.blur.emit(event);
        }
    };
    EmojiInputComponent.prototype.onFocus = function (event) {
        this.updateCursor();
        if (this.focus) {
            this.focus.emit(event);
        }
    };
    EmojiInputComponent.prototype.clean = function () {
        this.filterEmojis = '';
        this.filteredEmojis = this.getFilteredEmojis();
    };
    EmojiInputComponent.prototype.openPopup = function (status) {
        if (status === void 0) { status = null; }
        if (status === null) {
            this.popupOpen = !this.popupOpen;
        }
        else {
            this.popupOpen = status;
        }
    };
    EmojiInputComponent.prototype.updateFilteredEmojis = function () {
        this.filteredEmojis = this.getFilteredEmojis();
    };
    EmojiInputComponent.prototype.getFilteredEmojis = function () {
        var _this = this;
        return this.allEmojis.filter(function (e) {
            if (_this.filterEmojis === '') {
                return true;
            }
            else {
                for (var _i = 0, _a = e.aliases; _i < _a.length; _i++) {
                    var alias = _a[_i];
                    if (alias.includes(_this.filterEmojis)) {
                        return true;
                    }
                }
            }
            return false;
        });
    };
    EmojiInputComponent.prototype.onEmojiClick = function (e) {
        this.input = this.input.substr(0, this.lastCursorPosition) + e + this.input.substr(this.lastCursorPosition);
        this.modelChange.emit(this.input);
        this.emojiClick.emit(e);
        if (this.closeAfterSelection) {
            this.popupOpen = false;
            this.clean();
        }
    };
    EmojiInputComponent.prototype.onChange = function (newValue) {
        this.input = this.emojiService.emojify(newValue);
        this.model = this.input;
        this.modelChange.emit(this.input);
    };
    EmojiInputComponent.prototype.updateCursor = function () {
        if (this.textArea) {
            this.lastCursorPosition = this.textareaEl.nativeElement.selectionStart;
        }
        else {
            this.lastCursorPosition = this.inputEl.nativeElement.selectionStart;
        }
    };
    EmojiInputComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'emoji-input',
                    template: "\n    <ng-template [ngIf]=\"textArea\">\n      <textarea #textareaEl name=\"text\"\n        [ngClass]=\"[inputClass]\"\n        [attr.cols]=\"textArea.cols\"\n        [attr.rows]=\"textArea.rows\"\n        (keyup)=\"onKeyup($event)\"\n        (keyup.enter)=\"onEnter()\"\n        (blur)=\"onBlur($event)\"\n        (focus)=\"onFocus($event)\"\n        (ngModelChange)=\"onChange($event)\"\n        [(ngModel)]=\"input\">\n      </textarea>\n    </ng-template>\n    <ng-template [ngIf]=\"!textArea\">\n      <input #inputEl type=\"text\"\n        [ngClass]=\"[inputClass]\"\n        (keyup)=\"onKeyup($event)\"\n        (keyup.enter)=\"onEnter()\"\n        (blur)=\"onBlur($event)\"\n        (focus)=\"onFocus($event)\"\n        (ngModelChange)=\"onChange($event)\"\n        [(ngModel)]=\"input\"/>\n    </ng-template>\n    <div class=\"emoji-search\"\n      [ngClass]=\"[popupAnchor, searchClass]\"\n      [hidden]=\"!popupOpen\"\n      (click)=\"$event.stopPropagation()\">\n      <div class=\"search-header\">\n        <input type=\"search\" placeholder=\"Search...\"\n          [(ngModel)]=\"filterEmojis\"\n          (ngModelChange)=\"updateFilteredEmojis()\"/>\n      </div>\n      <div class=\"emojis-container\">\n        <span *ngFor=\"let emoji of filteredEmojis\"\n              (click)=\"onEmojiClick(emoji.emoji)\"\n               title=\"{{emoji.aliases[0]}}\">\n          {{emoji.emoji}}\n        </span>\n      </div>\n    </div>\n  ",
                    styles: ["\n      :host {\n        display: block;\n        position: relative;\n      }\n      :host .emoji-search {\n        background-color: #fff;\n        border: 1px solid #ccc;\n        border-radius: 4px;\n        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);\n        height: auto;\n        line-height: 1.5;\n        position: absolute;\n        right: 0;\n        width: 100%;\n        display: flex;\n        flex-direction: column;\n        z-index: 100;\n      }\n      :host .emoji-search[hidden] {\n        display: none;\n      }\n      :host .emoji-search.bottom {\n        top: -202px;\n      }\n      :host .emoji-search input {\n        border-radius: 4px;\n        font-size: 10px;\n        padding: 4px 8px;\n        margin: 0;\n        height: 30px;\n      }\n      :host .emoji-search .search-header {\n        background-color: #eee;\n        border-bottom: 1px solid #ccc;\n        border-radius: 4px 4px 0 0;\n        padding: 4px 8px;\n        width: 100%;\n      }\n      :host .emoji-search .emojis-container {\n        border-radius: 0 0 4px 4px;\n        max-height: 160px;\n        padding: 5px 12px;\n        overflow: auto;\n        overflow-x: hidden;\n        flex: 1;\n        display: flex;\n        flex-wrap: wrap;\n        justify-content: center;\n      }\n      :host .emoji-search span {\n        cursor: pointer;\n        padding: 4px 3px 2px 4px;\n        font-size: 24px;\n      }\n      :host .emoji-search span:hover {\n        background-color: #ccc;\n      }\n\n  "]
                },] },
    ];
    /** @nocollapse */
    EmojiInputComponent.ctorParameters = function () { return [
        { type: emoji_service_1.EmojiService, },
    ]; };
    EmojiInputComponent.propDecorators = {
        "textArea": [{ type: core_1.Input },],
        "popupAnchor": [{ type: core_1.Input },],
        "inputClass": [{ type: core_1.Input },],
        "searchClass": [{ type: core_1.Input },],
        "onEnter": [{ type: core_1.Input },],
        "model": [{ type: core_1.Input },],
        "autofocus": [{ type: core_1.Input },],
        "closeAfterSelection": [{ type: core_1.Input },],
        "modelChange": [{ type: core_1.Output },],
        "setPopupAction": [{ type: core_1.Output },],
        "blur": [{ type: core_1.Output },],
        "focus": [{ type: core_1.Output },],
        "keyup": [{ type: core_1.Output },],
        "emojiClick": [{ type: core_1.Output },],
        "textareaEl": [{ type: core_1.ViewChild, args: ['textareaEl',] },],
        "inputEl": [{ type: core_1.ViewChild, args: ['inputEl',] },],
    };
    return EmojiInputComponent;
}());
exports.EmojiInputComponent = EmojiInputComponent;
//# sourceMappingURL=emoji-input.component.js.map