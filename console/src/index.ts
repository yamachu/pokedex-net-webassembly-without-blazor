import { dotnet } from "@microsoft/dotnet-runtime";
import { writeFile } from "fs/promises";

const is_node =
  typeof process === "object" &&
  typeof process.versions === "object" &&
  typeof process.versions.node === "string";
if (!is_node) throw new Error(`This file only supports nodejs`);

const {
  setModuleImports,
  getAssemblyExports,
  getConfig,
  runMainAndExit,
  Module,
} = await dotnet.withDiagnosticTracing(false).create();

Module.FS_createPath("/", "work", true, true);

setModuleImports("main.mjs", {
  sqlite: {
    // This path is on wasm FS
    connection: () => "Data Source=/work/pokedex.db",
  },
});

const config = getConfig();
const exports = await getAssemblyExports(config.mainAssemblyName!);

exports.MyClass.Initialize();

await exports.MyClass.ExecuteQuery(`
  create table pokemons(id integer primary key, name text);
  insert into pokemons(id, name) values
    (0,'ヤマチュウ'),
    (1,'フシギダネ'),
    (2,'フシギソウ'),
    (3,'フシギバナ'),
    (4,'ヒトカゲ'),
    (5,'リザード'),
    (6,'リザードン'),
    (7,'ゼニガメ'),
    (8,'カメール'),
    (9,'カメックス'),
    (10,'キャタピー'),
    (11,'トランセル'),
    (12,'バタフリー'),
    (13,'ビードル'),
    (14,'コクーン'),
    (15,'スピアー'),
    (16,'ポッポ'),
    (17,'ピジョン'),
    (18,'ピジョット'),
    (19,'コラッタ'),
    (20,'ラッタ'),
    (21,'オニスズメ'),
    (22,'オニドリル'),
    (23,'アーボ'),
    (24,'アーボック'),
    (25,'ピカチュウ'),
    (26,'ライチュウ'),
    (27,'サンド'),
    (28,'サンドパン'),
    (29,'ニドラン♀'),
    (30,'ニドリーナ'),
    (31,'ニドクイン'),
    (32,'ニドラン♂'),
    (33,'ニドリーノ'),
    (34,'ニドキング'),
    (35,'ピッピ'),
    (36,'ピクシー'),
    (37,'ロコン'),
    (38,'キュウコン'),
    (39,'プリン'),
    (40,'プクリン'),
    (41,'ズバット'),
    (42,'ゴルバット'),
    (43,'ナゾノクサ'),
    (44,'クサイハナ'),
    (45,'ラフレシア'),
    (46,'パラス'),
    (47,'パラセクト'),
    (48,'コンパン'),
    (49,'モルフォン'),
    (50,'ディグダ'),
    (51,'ダグトリオ'),
    (52,'ニャース'),
    (53,'ペルシアン'),
    (54,'コダック'),
    (55,'ゴルダック'),
    (56,'マンキー'),
    (57,'オコリザル'),
    (58,'ガーディ'),
    (59,'ウインディ'),
    (60,'ニョロモ'),
    (61,'ニョロゾ'),
    (62,'ニョロボン'),
    (63,'ケーシィ'),
    (64,'ユンゲラー'),
    (65,'フーディン'),
    (66,'ワンリキー'),
    (67,'ゴーリキー'),
    (68,'カイリキー'),
    (69,'マダツボミ'),
    (70,'ウツドン'),
    (71,'ウツボット'),
    (72,'メノクラゲ'),
    (73,'ドククラゲ'),
    (74,'イシツブテ'),
    (75,'ゴローン'),
    (76,'ゴローニャ'),
    (77,'ポニータ'),
    (78,'ギャロップ'),
    (79,'ヤドン'),
    (80,'ヤドラン'),
    (81,'コイル'),
    (82,'レアコイル'),
    (83,'カモネギ'),
    (84,'ドードー'),
    (85,'ドードリオ'),
    (86,'パウワウ'),
    (87,'ジュゴン'),
    (88,'ベトベター'),
    (89,'ベトベトン'),
    (90,'シェルダー'),
    (91,'パルシェン'),
    (92,'ゴース'),
    (93,'ゴースト'),
    (94,'ゲンガー'),
    (95,'イワーク'),
    (96,'スリープ'),
    (97,'スリーパー'),
    (98,'クラブ'),
    (99,'キングラー'),
    (100,'ビリリダマ'),
    (101,'マルマイン'),
    (102,'タマタマ'),
    (103,'ナッシー'),
    (104,'カラカラ'),
    (105,'ガラガラ'),
    (106,'サワムラー'),
    (107,'エビワラー'),
    (108,'ベロリンガ'),
    (109,'ドガース'),
    (110,'マタドガス'),
    (111,'サイホーン'),
    (112,'サイドン'),
    (113,'ラッキー'),
    (114,'モンジャラ'),
    (115,'ガルーラ'),
    (116,'タッツー'),
    (117,'シードラ'),
    (118,'トサキント'),
    (119,'アズマオウ'),
    (120,'ヒトデマン'),
    (121,'スターミー'),
    (122,'バリヤード'),
    (123,'ストライク'),
    (124,'ルージュラ'),
    (125,'エレブー'),
    (126,'ブーバー'),
    (127,'カイロス'),
    (128,'ケンタロス'),
    (129,'コイキング'),
    (130,'ギャラドス'),
    (131,'ラプラス'),
    (132,'メタモン'),
    (133,'イーブイ'),
    (134,'シャワーズ'),
    (135,'サンダース'),
    (136,'ブースター'),
    (137,'ポリゴン'),
    (138,'オムナイト'),
    (139,'オムスター'),
    (140,'カブト'),
    (141,'カブトプス'),
    (142,'プテラ'),
    (143,'カビゴン'),
    (144,'フリーザー'),
    (145,'サンダー'),
    (146,'ファイヤー'),
    (147,'ミニリュウ'),
    (148,'ハクリュー'),
    (149,'カイリュー'),
    (150,'ミュウツー'),
    (151,'ミュウ');
`);

// Read generated pokedex.db on wasm FS
const dbBuffer = Module.FS_readFile("/work/pokedex.db", {});

// Write pokedex.db file to local FS
await writeFile("./pokedex.db", dbBuffer);

runMainAndExit(config.mainAssemblyName!, []);
