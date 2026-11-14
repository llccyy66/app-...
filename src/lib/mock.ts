export type Breath = "minor" | "major" | "steal" | "end";
export interface Seg { id: string; text: string; stress?: number[]; breath: Breath; sec: number }
export interface Version { id: string; pieceId: string; name: string; author: string; mine?: boolean; duration: string; segs: Seg[] }
export interface Piece { id: string; title: string; category: string; desc: string; level: 1 | 2 | 3; versions: string[]; todayReps: number; best?: number }

export const categories = ["贯口", "绕口令", "太平歌词", "定场诗", "数来宝"];

let n = 0;
const mk = (text: string, breath: Breath, sec: number, stress?: number[]): Seg => ({ id: `s${n++}`, text, breath, sec, stress });

const baocaiming: Seg[] = [
  mk("我请您吃", "minor", 1.2, [3]),
  mk("蒸羊羔、蒸熊掌、蒸鹿尾儿", "steal", 2.4, [1]),
  mk("烧花鸭、烧雏鸡、烧子鹅", "minor", 2.2),
  mk("卤猪、卤鸭、酱鸡、腊肉", "steal", 2.0),
  mk("松花、小肚儿、晾肉、香肠儿", "major", 2.4, [0]),
  mk("什锦苏盘、熏鸡白肚儿", "minor", 2.0),
  mk("清蒸八宝猪、江米酿鸭子", "steal", 2.3),
  mk("罐儿野鸡、罐儿鹌鹑", "minor", 1.9),
  mk("卤什件儿、卤子鹅、山鸡、兔脯", "major", 2.6, [6]),
  mk("菜蟒、银鱼、清蒸哈什蚂", "minor", 2.1),
  mk("烩鸭丝、烩鸭腰、烩鸭条", "steal", 2.2),
  mk("清拌鸭丝、黄心管儿", "major", 1.9),
  mk("焖白鳝、焖黄鳝、豆豉鲶鱼", "minor", 2.3),
  mk("锅烧鲤鱼、烀烂甲鱼", "steal", 2.0),
  mk("抓炒鲤鱼、抓炒对虾", "end", 2.1, [0, 1]),
];
const baocaimingG: Seg[] = [
  mk("我请您吃", "minor", 1.0),
  mk("蒸羊羔儿、蒸熊掌、蒸鹿尾儿", "minor", 2.3),
  mk("烧花鸭、烧雏鸡儿、烧子鹅", "steal", 2.1),
  mk("炉猪、炉鸭、酱鸡、腊肉", "major", 2.0, [0]),
  mk("松花、小肚儿、晾肉、香肠儿", "minor", 2.3),
  mk("什锦苏盘儿、熏鸡、白肚儿", "end", 2.2),
];
const bashanping: Seg[] = [
  mk("想当初", "minor", 0.9, [0]),
  mk("汉室三分、天下大乱", "minor", 2.0),
  mk("曹孟德篡位、刘玄德思贤", "steal", 2.4),
  mk("在卧龙岗上请出一人", "major", 2.2, [6, 7]),
  mk("此人复姓诸葛名亮、字孔明", "minor", 2.5),
  mk("道号卧龙先生", "end", 1.6, [4, 5]),
];
const raokouling: Seg[] = [
  mk("八百标兵奔北坡", "minor", 1.8, [0]),
  mk("炮兵并排北边跑", "major", 1.8),
  mk("炮兵怕把标兵碰", "minor", 1.8),
  mk("标兵怕碰炮兵炮", "end", 1.8, [6]),
];

export const versions: Version[] = [
  { id: "bcm-ma", pieceId: "baocaiming", name: "马志明版", author: "马志明", duration: "1′42″", segs: baocaiming },
  { id: "bcm-guo", pieceId: "baocaiming", name: "郭德纲版", author: "郭德纲", duration: "1′35″", segs: baocaimingG },
  { id: "bcm-mine", pieceId: "baocaiming", name: "我的整理版", author: "我", mine: true, duration: "1′50″", segs: baocaiming.slice(0, 8) },
  { id: "bsp-liu", pieceId: "bashanping", name: "刘宝瑞版", author: "刘宝瑞", duration: "3′10″", segs: bashanping },
  { id: "bbb-std", pieceId: "babaibiaobing", name: "通行版", author: "传统", duration: "0′12″", segs: raokouling },
];

export const pieces: Piece[] = [
  { id: "baocaiming", title: "报菜名", category: "贯口", desc: "两百余道菜名一气呵成，贯口入门第一课", level: 2, versions: ["bcm-ma", "bcm-guo", "bcm-mine"], todayReps: 6, best: 98 },
  { id: "bashanping", title: "八扇屏", category: "贯口", desc: "八位古人八段赞，考验气息与人物分寸", level: 3, versions: ["bsp-liu"], todayReps: 2, best: 186 },
  { id: "xiyoulu", title: "地理图", category: "贯口", desc: "地名连缀，从北京一路说到天涯", level: 3, versions: [], todayReps: 0 },
  { id: "babaibiaobing", title: "八百标兵", category: "绕口令", desc: "b/p 双唇音交替，练嘴皮子利索", level: 1, versions: ["bbb-std"], todayReps: 12, best: 9 },
  { id: "chiputao", title: "吃葡萄不吐葡萄皮", category: "绕口令", desc: "最熟悉的那一段", level: 1, versions: [], todayReps: 0 },
  { id: "wangerjie", title: "韩信算卦", category: "太平歌词", desc: "板眼分明的太平歌词名段", level: 2, versions: [], todayReps: 0 },
  { id: "dingchang", title: "一番话说得你心开", category: "定场诗", desc: "开场压堂，稳住全场", level: 1, versions: [], todayReps: 0 },
];

export const getPiece = (id: string) => pieces.find((p) => p.id === id);
export const getVersion = (id: string) => versions.find((v) => v.id === id);

export const reps = [
  { n: 1, sec: 112, err: 7 }, { n: 2, sec: 106, err: 5 }, { n: 3, sec: 104, err: 4 },
  { n: 4, sec: 101, err: 3 }, { n: 5, sec: 99, err: 2 }, { n: 6, sec: 98, err: 2 },
];

export const user = { name: "小石头", title: "票友 · 三段", streak: 23, totalReps: 1386, todayMin: 34, level: "三段" };

export const lessons = [
  { id: "douhen", title: "逗哏与捧哏", sub: "一个逗，一个捧，三分逗七分捧", cards: 6, done: 6, mark: "逗" },
  { id: "shuoxue", title: "说学逗唱", sub: "四门功课，缺一不可", cards: 8, done: 5, mark: "说" },
  { id: "history", title: "相声简史", sub: "从天桥撂地到剧场园子", cards: 10, done: 3, mark: "史" },
  { id: "chundian", title: "春典（行话）", sub: "「腥」「尖」「把点开活」", cards: 12, done: 0, mark: "春" },
  { id: "shicheng", title: "师承常识", sub: "门户、辈分与摆知", cards: 7, done: 0, mark: "师" },
];
export const lessonCards: Record<string, { h: string; b: string }[]> = {
  douhen: [
    { h: "逗哏", b: "负责抖包袱、主导叙事的一方，通常站在桌子里侧。" },
    { h: "捧哏", b: "负责铺垫、接话、翻包袱。好的捧哏让包袱响一倍。" },
    { h: "三分逗七分捧", b: "行内老话，说明捧哏的分量从不在逗哏之下。" },
  ],
};

export const tasks = [
  { t: "《报菜名》跟练 10 遍", cur: 6, max: 10 },
  { t: "完成 1 场即时对战", cur: 1, max: 1 },
  { t: "读完 2 张常识卡", cur: 0, max: 2 },
];

export const leaderboard = [
  { name: "津门小柳", streak: 211, reps: 9820, me: false },
  { name: "德云票友A", streak: 186, reps: 8410, me: false },
  { name: "艺考冲冲冲", streak: 97, reps: 6022, me: false },
  { name: "北城说书人", streak: 64, reps: 3310, me: false },
  { name: "小石头", streak: 23, reps: 1386, me: true },
  { name: "嘴皮子练习生", streak: 12, reps: 920, me: false },
];

export const recordings = [
  { id: "r1", piece: "报菜名 · 马志明版", date: "今天 08:12", sec: 98, score: 92 },
  { id: "r2", piece: "报菜名 · 马志明版", date: "今天 08:05", sec: 101, score: 88 },
  { id: "r3", piece: "八百标兵", date: "昨天 21:40", sec: 9, score: 95 },
  { id: "r4", piece: "八扇屏 · 刘宝瑞版", date: "11月12日", sec: 186, score: 74 },
];

export const badges = [
  { n: "初开口", d: "完成第一遍", got: true }, { n: "七日功", d: "连续7天", got: true },
  { n: "百遍成诵", d: "单曲100遍", got: true }, { n: "一口气", d: "百秒内报菜名", got: true },
  { n: "月满", d: "连续30天", got: false }, { n: "擂主", d: "对战10连胜", got: false },
];

// 近 15 周热力：0-4
export const heat: number[] = Array.from({ length: 105 }, (_, i) => {
  if (i > 81) return [3, 4, 2, 4, 3, 4, 2, 3, 4, 3, 4, 2, 3, 4, 3, 4, 4, 3, 2, 4, 3, 4, 2][i - 82] ?? 2;
  return Math.abs(Math.sin(i * 1.7) * 5) | 0 % 5;
}).map((v) => Math.min(4, v));

export const trend = [62, 70, 58, 81, 90, 76, 95, 88, 102, 97, 110, 104, 118, 112];
