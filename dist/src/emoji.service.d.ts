import { Emoji } from './emoji.db';
export declare class EmojiService {
    PARSE_REGEX: RegExp;
    get(emoji: any): any;
    getAll(): Emoji[];
    emojify(str: any): any;
}
