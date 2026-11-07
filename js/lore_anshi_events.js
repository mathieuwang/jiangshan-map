// Events of the An Lushan Rebellion (安史之乱) drawn from the 《旧唐书》, for the storyline demo.
// Load after lore_data.js. Each event follows the PLACE_LANDMARK_EVENTS shape, plus:
//   id         stable reference for storylines
//   juan       chapter of the 《旧唐书》 the quote comes from
//   quote      exact wording of the Wikisource transcription, checked by script
//   yearBasis  'stated' (the text dates it) or 'inferred' (placed by context or outside knowledge)
//   siteBasis  'atlas' (coordinates reused from atlas data) or 'approx' (estimated, not surveyed)
//   note       where the sources disagree
// `month` is the lunar month as the sources give it, matching existing atlas data.
(function () {
  const lore = window.ATLAS_LORE_DATA;
  if (!lore || !Array.isArray(lore.PLACE_LANDMARK_EVENTS)) return;

  const PLACES = {
    changan: [[108.94, 34.34], '长安', 'Chang’an', 'atlas'],
    luoyang: [[112.45, 34.62], '洛阳', 'Luoyang', 'atlas'],
    fanyang: [[116.4, 39.9], '范阳（北京）', 'Fanyang (Beijing)', 'atlas'],
    taiyuan: [[112.55, 37.87], '太原', 'Taiyuan', 'atlas'],
    changshan: [[114.57, 38.14], '常山（真定）', 'Changshan (Zhending)', 'atlas'],
    xiangzhou: [[114.35, 36.32], '邺城（相州）', 'Yecheng (Xiangzhou)', 'atlas'],
    weizhou: [[115.25, 36.35], '魏州（大名）', 'Weizhou (Daming)', 'atlas'],
    tongguan: [[110.25, 34.54], '潼关', 'Tongguan', 'atlas'],
    pingliang: [[106.67, 35.54], '平凉', 'Pingliang', 'atlas'],
    lingwu: [[106.28, 38.09], '灵武', 'Lingwu', 'atlas'],
    fengxiang: [[107.39, 34.52], '凤翔', 'Fengxiang', 'atlas'],
    suiyang: [[115.65, 34.44], '睢阳（商丘）', 'Suiyang (Shangqiu)', 'atlas'],
    yongqiu: [[114.78, 34.55], '雍丘（杞县）', 'Yongqiu (Qixian)', 'atlas'],
    xuzhou: [[117.18, 34.26], '徐州', 'Xuzhou', 'atlas'],
    kucha: [[82.96, 41.72], '龟兹（库车）', 'Kucha', 'atlas'],
    liangzhou: [[102.64, 37.93], '凉州（武威）', 'Liangzhou (Wuwei)', 'atlas'],
    shibao: [[101.25, 36.68], '石堡城', 'Shibao Fortress', 'atlas'],
    lintong: [[109.21, 34.37], '华清宫（临潼）', 'Huaqing Palace (Lintong)', 'atlas'],
    tuhuzhen: [[119.3, 42.2], '土护真河（老哈河）', 'Tuhuzhen River (Laoha)', 'approx'],
    jishi: [[101.4, 36.05], '积石军（贵德）', 'Jishi Garrison (Guide)', 'approx'],
    longju: [[100.4, 36.85], '青海龙驹岛', 'Longju Island, Qinghai Lake', 'approx'],
    shiguo: [[69.24, 41.3], '石国（塔什干）', 'Chach (Tashkent)', 'approx'],
    erhai: [[100.2, 25.7], '西洱河（大理）', 'Xi’er River (Dali)', 'approx'],
    shanjun: [[111.2, 34.77], '陕郡（三门峡）', 'Shan Commandery (Sanmenxia)', 'approx'],
    zhenyuan: [[115.48, 33.86], '真源（鹿邑）', 'Zhenyuan (Luyi)', 'approx'],
    jiashan: [[114.69, 38.62], '嘉山（曲阳）', 'Mount Jia (Quyang)', 'approx'],
    lingbao: [[110.75, 34.55], '灵宝西原', 'West Plain of Lingbao', 'approx'],
    huihe: [[102.66, 47.43], '回纥牙帐', 'Uyghur Khagan’s Court', 'approx'],
    linhuai: [[118.5, 33.0], '临淮（泗州）', 'Linhuai (Sizhou)', 'approx'],
    xiangji: [[108.88, 34.1], '香积寺', 'Xiangji Temple', 'atlas'],
    wangxian: [[108.72, 34.33], '望贤宫（咸阳）', 'Wangxian Palace (Xianyang)', 'approx'],
    heyang: [[112.79, 34.91], '河阳（孟州）', 'Heyang (Mengzhou)', 'approx'],
    mangshan: [[112.45, 34.76], '邙山', 'Mount Mang', 'approx'],
    liuquan: [[111.75, 34.45], '柳泉驿', 'Liuquan Post Station', 'approx'],
    wenquan: [[118.4, 39.6], '温泉栅（平州石城）', 'Wenquan Stockade (Shicheng)', 'approx'],
    fenzhou: [[111.79, 37.27], '汾州', 'Fenzhou', 'approx'],
  };

  // [id, year, month|null, place, zh, en, persons, juan, quote, yearBasis, note?]
  const RAW = [
    ['tsz-crown', 738, 6, 'changan', '忠王李亨立为皇太子，即后来的唐肃宗', 'Prince Zhong, Li Heng, the future Emperor Suzong, is named crown prince', ['tangsuzong'], '卷10', '二十六年六月庚子，立上為皇太子', 'stated'],
    ['fcq-petition', 741, null, 'kucha', '封常清投牒求为高仙芝傔从，遭拒后直言“若以貌取人，恐失之子羽”', 'Refused as an orderly for his looks, Feng Changqing rebukes Gao Xianzhi and wins the post', ['fengchangqing', 'gaoxianzhi'], '卷104', '若以貌取人，恐失之子羽矣', 'inferred', '史文仅称开元末之前，年份为推定'],
    ['sm-audience', 742, null, 'changan', '史思明入朝奏事，唐玄宗赐坐，抚其背曰“卿贵在后”', 'Shi Siming reports to court; Emperor Xuanzong pats his back and says his greatness lies ahead', ['shisiming', 'tangxuanzong'], '卷200上', '玄宗撫其背曰：「卿貴在後，勉之。」', 'inferred', '史文作天宝初'],
    ['ygf-enter', 745, 8, 'changan', '杨贵妃以太真之号入侍，唐玄宗大悦，宫中呼为“娘子”', 'Taizhen, later Consort Yang, delights Emperor Xuanzong and is treated as an empress in all but name', ['yangguifei', 'tangxuanzong'], '卷51', '既進見，玄宗大悅', 'stated', '本传未系年；年月据卷9天宝四载八月册太真妃杨氏为贵妃'],
    ['lgb-zhongsi', 746, null, 'liangzhou', '王忠嗣补李光弼为兵马使，常言“光弼必居我位”', 'Commander Wang Zhongsi promotes Li Guangbi and predicts he will one day hold his post', ['liguangbi'], '卷110', '常云：「光弼必居我位。」', 'stated'],
    ['ygf-expel', 746, 7, 'changan', '杨贵妃获谴送归杨铦宅，唐玄宗终日不食，高力士迎之还宫', 'Consort Yang is sent home in disgrace; Xuanzong cannot eat, and she is brought back that night', ['yangguifei', 'tangxuanzong'], '卷51', '貴妃以微譴送歸楊銛宅', 'stated', '底本“皇場五載”当为“天寶五載”之讹'],
    ['gsh-maizhuang', 747, null, 'jishi', '哥舒翰伏兵积石军，尽歼来抢麦的吐蕃五千骑', 'Geshu Han ambushes the five thousand Tibetan riders who came each year to seize the wheat at Jishi', ['geshuhan'], '卷104', '吐蕃以五千騎至，翰於城中率驍勇馳擊，殺之略盡', 'stated'],
    ['gsh-yinglong', 748, null, 'longju', '哥舒翰筑城青海龙驹岛，号应龙城，吐蕃不敢近青海', 'Geshu Han fortifies Longju Island in Qinghai Lake, and the Tibetans keep clear of the lake', ['geshuhan'], '卷104', '又築城於青海中龍駒島，有白龍見，遂名為應龍城', 'stated'],
    ['gsh-shibao', 749, null, 'shibao', '哥舒翰总统十万众，不旬日攻拔吐蕃石堡城', 'Geshu Han leads a hundred thousand men and takes the Tibetan fortress of Shibao within ten days', ['geshuhan'], '卷104', '八載，以朔方、河東群牧十萬眾委翰總統攻石堡城', 'stated'],
    ['gxz-chach', 750, null, 'shiguo', '高仙芝讨平石国，俘其国王以归', 'Gao Xianzhi subdues the state of Chach and returns with its king as a captive', ['gaoxianzhi'], '卷104', '九載，將兵討石國，平之，獲其國王以歸', 'stated'],
    ['ygf-hair', 750, null, 'changan', '杨贵妃再度忤旨，翦发附献，唐玄宗惊惋，即召还宫', 'Sent away again, Consort Yang sends Xuanzong a lock of hair and is recalled at once', ['yangguifei', 'tangxuanzong'], '卷51', '乃引刀翦髮一繚附獻', 'stated'],
    ['ygz-nanzhao', 751, null, 'erhai', '杨国忠荐鲜于仲通讨南诏，八万精兵全军覆没，杨国忠掩败叙功', 'Yang Guozhong’s nominee loses eighty thousand men against Nanzhao, and Yang reports a success', ['yangguozhong'], '卷106', '與羅鳳戰於瀘南，全軍陷沒', 'inferred', '本传系于十载之前，年份待核'],
    ['fcq-anxi', 752, null, 'kucha', '王正见死，封常清代知安西四镇节度事', 'After Wang Zhengjian’s death Feng Changqing takes command of the Four Garrisons of Anxi', ['fengchangqing'], '卷104', '十一載，正見死，乃以常清為安西副大都護', 'stated'],
    ['aqx-rescue', 752, 8, 'tuhuzhen', '安禄山讨契丹大败于土护真河，中箭坠坑，子安庆绪扶之脱走', 'Routed by the Khitan, a wounded An Lushan falls into a pit and is carried out by his son An Qingxu', ['anqingxu', 'anlushan'], '卷200上', '墜坑中，其男慶緒等扶持之', 'stated'],
    ['ygz-chancellor', 752, null, 'changan', '李林甫卒，杨国忠代为右相，前后领四十余使', 'Li Linfu dies and Yang Guozhong becomes chief minister, holding more than forty commissions', ['yangguozhong'], '卷106', '會林甫卒，遂代為右相', 'inferred', '本传前文作十一载'],
    ['fcq-huaqing', 755, 11, 'lintong', '封常清谒唐玄宗于华清宫，请赴东京募兵，“计日取逆胡之首”', 'At Huaqing Palace Feng Changqing promises Xuanzong he will raise troops and soon have the rebel’s head', ['fengchangqing', 'tangxuanzong'], '卷104', '計日取逆胡之首懸於闕下', 'stated'],
    ['zx-zhenyuan', 755, 12, 'zhenyuan', '叛军南下，真源令张巡说太守完城募兵，与贾贲同举义兵', 'As the rebels advance, Zhang Xun, magistrate of Zhenyuan, raises volunteers in resistance', ['zhangxun'], '卷187下', '祿山之亂，巡為真源令', 'inferred', '史文未记月份'],
    ['ygq-tumen', 755, 12.5, 'changshan', '颜杲卿与颜真卿相约起兵，诱杀叛将蒋钦凑，开土门，河北诸郡响应', 'Allied with Yan Zhenqing, Yan Gaoqing kills the rebel commander at Tumen and Hebei rises', ['yangaoqing', 'yanzhenqing'], '卷187下', '時十五郡皆為國家所守', 'stated', '卷187下作十五郡、蒋钦凑；卷200上作十七郡、李钦湊'],
    ['fcq-luoyang', 755, 12, 'luoyang', '安禄山攻东都，封常清以市井新兵连战皆败，洛阳陷落', 'An Lushan storms Luoyang; Feng Changqing’s raw recruits lose battle after battle and the city falls', ['fengchangqing', 'anlushan'], '卷104', '賊鼓噪於四城門入，殺掠人吏', 'stated'],
    ['gxz-retreat', 755, 12.2, 'shanjun', '封常清败走陕郡，劝高仙芝弃陕，二人焚仓退保潼关', 'Feng Changqing reaches Shan and persuades Gao Xianzhi to burn the stores and fall back on Tongguan', ['fengchangqing', 'gaoxianzhi'], '卷104', '宜棄此守，急保潼關', 'stated'],
    ['gxz-execution', 755, 12.4, 'tongguan', '宦官边令诚赍敕至军，封常清、高仙芝同斩于潼关，士卒齐呼“枉”', 'Feng Changqing and Gao Xianzhi are beheaded at Tongguan as their troops cry injustice', ['fengchangqing', 'gaoxianzhi'], '卷104', '兵齊呼曰：「枉」，其聲殷地', 'stated'],
    ['ygz-kneel', 755, 12, 'changan', '唐玄宗欲令太子李亨监国而亲征，杨国忠大惧，杨贵妃衔土请命，事遂止', 'Alarmed by Xuanzong’s plan to name a regent, Yang Guozhong has Consort Yang plead for its abandonment', ['yangguozhong', 'yangguifei', 'tangxuanzong', 'tangsuzong'], '卷106', '貴妃銜土請命', 'inferred', '本传未记月份，据卷10系于十二月'],
    ['gsh-tongguan', 755, 12.6, 'tongguan', '哥舒翰抱病受命，统河陇、朔方及蕃兵二十万拒守潼关', 'Though ill, Geshu Han takes command of two hundred thousand men at Tongguan', ['geshuhan'], '卷104', '河隴、朔方兵及蕃兵與高仙芝舊卒共二十萬，拒賊於潼關', 'stated'],
    ['ygq-fall', 756, 1, 'changshan', '史思明、蔡希德攻陷常山，颜杲卿被执送洛阳', 'Shi Siming and Cai Xide take Changshan and send Yan Gaoqing to Luoyang in chains', ['shisiming', 'yangaoqing'], '卷200上', '十五載正月六日，思明與蔡希德圍顏杲卿於常山，九日拔之', 'stated', '卷187下作“其月八日，城陷”'],
    ['ygq-death', 756, 1.5, 'luoyang', '颜杲卿瞋目骂安禄山，被节解于洛阳中桥，至气绝骂不息', 'Yan Gaoqing denounces An Lushan to his face and is dismembered on Luoyang’s Middle Bridge', ['yangaoqing', 'anlushan'], '卷187下', '令縛於中橋南頭從西第二柱，節解之，比至氣絕，大罵不息', 'stated'],
    ['lgb-changshan', 756, 2, 'changshan', '李光弼东出井陉收复常山，破叛军援军，释颜杲卿家属', 'Li Guangbi marches through the Jingxing Pass, retakes Changshan and frees Yan Gaoqing’s family', ['liguangbi', 'yangaoqing'], '卷110', '東下井陘，收常山郡', 'stated'],
    ['zx-yongqiu', 756, null, 'yongqiu', '张巡与贾贲入雍丘，贾贲战死，张巡独守孤城累月', 'Zhang Xun and Jia Ben seize Yongqiu; Jia is killed and Zhang holds the town alone for months', ['zhangxun'], '卷187下', '賁與巡引眾入雍丘', 'inferred', '史文未记确切时间'],
    ['lgb-jiashan', 756, 5, 'jiashan', '郭子仪、李光弼、仆固怀恩大破史思明于嘉山，河北十余郡归顺', 'Guo Ziyi and Li Guangbi crush Shi Siming at Mount Jia, and over ten Hebei commanderies submit', ['liguangbi', 'guoziyi', 'shisiming', 'puguhuaien'], '卷200上', '思明以騎卒奔嘉山，光弼擊之，思明大敗，走入博陵郡', 'stated', '思明传作五月；卷110与禄山传作六月；卷10系于八月壬午'],
    ['gsh-captive', 756, 6.5, 'luoyang', '哥舒翰被部将执降，伏地对安禄山称“肉眼不识陛下”，遭幽禁', 'Handed over by his own officer, Geshu Han kneels to An Lushan and is imprisoned', ['geshuhan', 'anlushan'], '卷104', '肉眼不識陛下', 'stated'],
    ['tsz-pingliang', 756, 6.7, 'pingliang', '唐肃宗与玄宗分道北上，至平凉阅监牧之马，军势渐振', 'Parting from Xuanzong, the future Emperor Suzong rebuilds his force at Pingliang', ['tangsuzong'], '卷10', '辛丑，至平涼郡，蒐閱監牧公私馬，得數萬疋，官軍益振', 'stated'],
    ['ph-huihe', 756, 9, 'huihe', '仆固怀恩随敦煌王承寀出使回纥，请兵结好', 'Pugu Huai’en travels with the Prince of Dunhuang to ask the Uyghurs for troops', ['puguhuaien'], '卷121', '乃遣懷恩與燉煌王承寀使於回紇，請兵結好', 'stated'],
    ['ph-tongluo', 756, 11, 'lingwu', '仆固怀恩从郭子仪击同罗，斩战败投敌又逃归的儿子，全军振奋', 'Fighting the Tongluo, Pugu Huai’en executes his own son for surrendering to the enemy', ['puguhuaien'], '卷121', '懷恩子玢領徒擊賊，兵敗而降，尋又自拔而歸，懷恩叱而斬之', 'stated', '月份据卷10'],
    ['lgb-taiyuan', 757, 1, 'taiyuan', '史思明、蔡希德围太原，李光弼以不满万人掘壕穿地道，守城破敌', 'With under ten thousand men, Li Guangbi uses tunnels to break Shi Siming’s siege of Taiyuan', ['liguangbi', 'shisiming'], '卷110', '光弼令穿地道，一夕而擒之', 'stated'],
    ['tsz-fengxiang', 757, 2, 'fengxiang', '唐肃宗进驻凤翔，尽括公私马，议大举收复两京', 'Emperor Suzong moves to Fengxiang and plans a great campaign to recover both capitals', ['tangsuzong'], '卷10', '二月戊子，幸鳳翔郡', 'stated'],
    ['zx-linhuai', 757, 8, 'linhuai', '张巡遣南霁云突围向贺兰进明乞师不得，南霁云啮指而归', 'Sent by Zhang Xun to beg for relief, Nan Jiyun is refused at Linhuai and bites off a finger in protest', ['zhangxun'], '卷187下', '請嚙一指', 'inferred', '史文未记月份'],
    ['ph-xiangji', 757, 9, 'xiangji', '香积寺之战，仆固怀恩率回纥军击破伏兵，叛军大溃', 'At Xiangji Temple Pugu Huai’en’s Uyghur cavalry destroy the rebel ambush and the enemy line breaks', ['puguhuaien'], '卷121', '懷恩引回紇馳殺之，匹馬不歸，賊乃大潰', 'stated', '月份据卷10'],
    ['aqx-flee', 757, 10.5, 'xiangzhou', '叛军新店大败，安庆绪弃洛阳奔河北，保邺郡', 'After the rout at Xindian An Qingxu abandons Luoyang and retreats north to Ye', ['anqingxu'], '卷200上', '慶緒率其餘眾奔河北，保鄴郡', 'stated'],
    ['gsh-death', 757, 10.6, 'luoyang', '安庆绪败走时，囚于洛阳的哥舒翰遇害', 'Geshu Han, a prisoner in Luoyang, is killed as An Qingxu’s regime collapses', ['geshuhan', 'anqingxu'], '卷104', '遂閉翰於苑中，潛殺之', 'inferred', '卷104谓禄山潜杀；卷187下谓庆绪败走时严庄害之，暂从后者系年'],
    ['sm-surrender', 757, 12.3, 'fanyang', '史思明以所部八万人及十三州归降唐朝，受封归义王', 'Shi Siming surrenders to the Tang with eighty thousand men and is made Prince of Guiyi', ['shisiming'], '卷200上', '遂令衙官竇子昂奉表，以所管兵眾八萬人', 'stated', '月份据卷10'],
    ['tsz-return', 757, 12.2, 'wangxian', '唐玄宗自蜀还京，唐肃宗迎于望贤宫，捧足涕泣', 'Xuanzong returns from Sichuan; Suzong meets him at Wangxian Palace and weeps at his feet', ['tangsuzong', 'tangxuanzong'], '卷10', '上匍匐捧上皇足，涕泗嗚咽', 'stated'],
    ['sm-wuchengen', 758, 4, 'fanyang', '乌承恩图杀史思明事泄，供称李光弼之谋，史思明杖杀之，再生反意', 'A Tang plot is exposed; Shi Siming beats the agent Wu Cheng’en to death and turns on the court', ['shisiming', 'liguangbi'], '卷200上', '臣以十三州之地、十萬眾之兵降國家，赤心不負陛下，何至殺臣', 'stated'],
    ['aqx-siege', 758, 10, 'xiangzhou', '郭子仪、李光弼、仆固怀恩等九节度围相州，安庆绪困守，城中人相食', 'Nine commanders besiege An Qingxu in Xiangzhou, where the starving people turn to cannibalism', ['anqingxu', 'guoziyi', 'liguangbi', 'puguhuaien'], '卷200上', '慶緒自十月被圍至二月，城中人相食', 'stated', '卷10系出师于九月'],
    ['sm-yanwang', 759, 1, 'weizhou', '史思明陷魏州屠三万人，于城北设坛，自称大圣燕王', 'Shi Siming sacks Weizhou, killing thirty thousand, and proclaims himself Great Sage King of Yan', ['shisiming'], '卷200上', '思明于魏州北設壇，僭稱為大聖燕王', 'stated'],
    ['sm-luoyang', 759, 9, 'luoyang', '史思明再陷洛阳，李光弼预先疏散全城，移军河阳', 'Shi Siming retakes Luoyang, which Li Guangbi has already emptied before moving his army to Heyang', ['shisiming', 'liguangbi'], '卷110', '遂移牒留守及河南尹並留司官、坊市居人，出城避寇，空其城', 'stated', '月份据卷10'],
    ['lgb-heyang', 759, 10, 'heyang', '李光弼据河阳三城，大破史思明军于中潬，生擒周挚', 'Holding the three forts of Heyang, Li Guangbi routs Shi Siming’s army and captures his general Zhou Zhi', ['liguangbi', 'shisiming'], '卷110', '於中潬城西大破逆黨五千餘眾', 'stated'],
    ['lgb-mangshan', 761, 2, 'mangshan', '鱼朝恩、仆固怀恩催战，李光弼被迫与史思明战于北邙，官军败绩', 'Pushed into battle by Yu Chao’en and Pugu Huai’en, Li Guangbi is defeated by Shi Siming at Mount Mang', ['liguangbi', 'shisiming', 'puguhuaien'], '卷10', '戊寅，李光弼率河陽之軍五萬，與史思明之眾戰於北邙，官軍敗績', 'stated'],
    ['sm-death', 761, 3, 'liuquan', '史思明欲斩子史朝义，反被其部将擒杀于柳泉驿，史朝义即位', 'Threatened by his father, Shi Chaoyi has Shi Siming strangled at Liuquan and takes the throne', ['shisiming', 'shichaoyi'], '卷200上', '思明至柳泉驛，縊殺之。朝義便僭偽位。', 'stated', '月份据卷10'],
    ['scy-fanyang', 761, null, 'fanyang', '史朝义遣人至范阳杀太子史朝英，城中混战数日，死者数千', 'Shi Chaoyi’s agents kill his brother Chaoying in Fanyang, setting off days of fighting in the city', ['shichaoyi'], '卷200上', '使人往范陽，殺偽太子朝英等', 'inferred', '史文未记月份'],
    ['lgb-xuzhou', 761, null, 'xuzhou', '史朝义围宋州，李光弼径赴徐州坐镇，遣田神功击退之', 'As Shi Chaoyi besieges Songzhou, Li Guangbi moves to Xuzhou and sends a force to relieve the city', ['liguangbi', 'shichaoyi'], '卷110', '自領精騎圍李岑於宋州', 'inferred', '史文未记年份，或在762年'],
    ['tsz-death', 762, 4, 'changan', '唐肃宗病重，崩于长生殿，距上皇之崩仅十余日', 'Emperor Suzong dies in the Changsheng Hall, days after his father', ['tangsuzong'], '卷10', '是日，上崩於長生殿，年五十二', 'stated'],
    ['ph-taiyuan', 762, 9, 'taiyuan', '仆固怀恩与回纥可汗相见于太原，说其转而助唐讨史朝义', 'Pugu Huai’en meets the Uyghur khagan, his son-in-law, at Taiyuan and wins him over against Shi Chaoyi', ['puguhuaien', 'shichaoyi'], '卷121', '懷恩與回紇可汗相見於太原', 'stated', '史文作“其秋”'],
    ['ph-luoyang', 762, 10, 'mangshan', '仆固怀恩率军与回纥败史朝义于昭觉寺，再收东都', 'Pugu Huai’en and the Uyghurs defeat Shi Chaoyi at Zhaojue Temple and retake the Eastern Capital', ['puguhuaien', 'shichaoyi'], '卷121', '朝義領鐵騎十萬來救，陣於昭覺寺', 'stated'],
    ['scy-death', 763, 1, 'wenquan', '史朝义穷途自缢于林中，李怀仙传首京师', 'Cornered at Wenquan, Shi Chaoyi hangs himself in the woods and Li Huaixian sends his head to the capital', ['shichaoyi'], '卷121', '走入長林自縊', 'stated', '卷121作二年三月温泉栅自缢；卷200上作二年正月莫州被擒；卷11系于宝应元年末。月份待核'],
    ['ph-letter', 763, 8, 'fenzhou', '仆固怀恩受辛云京、骆奉先猜忌，屯军汾州，上书自诉功伐', 'Suspected by rivals, Pugu Huai’en camps at Fenzhou and writes to defend his record', ['puguhuaien'], '卷121', '乃上書自敘功伐', 'stated'],
    ['lgb-death', 764, 7, 'xuzhou', '李光弼畏宦官之谗不敢入朝，愧恨成疾，卒于徐州', 'Afraid of the eunuchs and unable to return to court, Li Guangbi falls ill and dies at Xuzhou', ['liguangbi'], '卷110', '廣德二年七月，薨於徐州，時年五十七', 'stated'],
    ['ph-death', 765, 9, 'lingwu', '仆固怀恩引吐蕃、回纥南犯，途中得疾，死于灵武', 'Leading Tibetan and Uyghur forces against the Tang, Pugu Huai’en falls ill and dies at Lingwu', ['puguhuaien'], '卷121', '九月九日，死於靈武', 'stated'],
  ];

  const known = new Set(lore.PLACE_LANDMARK_EVENTS.map((e) => e.id).filter(Boolean));
  for (const r of RAW) {
    const [id, year, month, placeKey, zh, en, persons, juan, quote, yearBasis, note] = r;
    const place = PLACES[placeKey];
    if (!place || known.has(id)) continue;
    const ev = {
      id,
      dynastyKey: 'tang',
      year,
      coord: place[0],
      site: place[1],
      siteEn: place[2],
      siteBasis: place[3],
      zh,
      en,
      persons,
      juan,
      quote,
      yearBasis,
    };
    if (month != null) ev.month = month;
    if (note) ev.note = note;
    lore.PLACE_LANDMARK_EVENTS.push(ev);
  }
})();
