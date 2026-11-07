// Storylines (纪事本末): curated, ordered steps that tell one historical story.
// Load after the lore files.
//
// cast:  { id, person?, zh?, en?, side }. `person` links a PERSON_PROFILES key; without it the
//        member is a name only, so a story never depends on adding a full profile first.
// protagonist: optional cast id for a one-person storyline. That person joins every step as a
//        lead and has one continuous route, unless a step is marked `side`.
// steps: { event | milestone, leads, others, from?, at?, month?, hideMonth?, side? }
//   event      id of a PLACE_LANDMARK_EVENTS entry
//   milestone  'dynastyKey:year' of a dynasty milestone
//   leads      cast ids who are the main participants of this step
//   others     cast ids who take part in a supporting role
//   from       { castId: coord } where someone sets out from, when no earlier step places them
//   at         { castId: coord } where someone is, when that is not the event's site
//   month      lunar month for this step, when the event itself has none
//   hideMonth  true when the month is uncertain: it still orders the step but is not shown
//   side       true when the step follows someone else and the protagonist stays where they are
// A cast member stays where the last step left them, and only people named in a step move.
// A name stays on the map from the first step that names a person through the last one.
(function () {
  const lore = window.ATLAS_LORE_DATA;
  if (!lore) return;

  const CHANGAN = [108.94, 34.34];
  const LUOYANG = [112.45, 34.62];
  const TAIYUAN = [112.55, 37.87];
  const LINGWU = [106.28, 38.09];
  const CHENGDU = [104.06, 30.67];
  const SHANJUN = [111.2, 34.77];
  const YONGQIU = [114.78, 34.55];
  const PINGYUAN = [116.4, 37.16];
  const XIANGYANG = [112.14, 32.04];
  const XUCHANG = [113.85, 34.03];
  const YE = [114.35, 36.32];
  const JIANKANG = [118.8, 32.06];
  const HUAYIN = [110.09, 34.57];
  const YUNCHENG = [113.69, 31.26];
  const PINGYANG = [111.52, 36.08];
  const CHANGSHAN = [114.57, 38.14];

  lore.STORYLINES = [
    {
      key: 'anshi',
      zh: '安史之乱',
      en: 'An Lushan Rebellion',
      subtitleZh: '755—763 · 四任燕帝与大唐中兴',
      subtitleEn: '755–763, four Yan rulers against the Tang',
      descZh:
        '安禄山起兵范阳，燕政权却在八年间三度父子相残：安庆绪弑安禄山，史思明杀安庆绪，史朝义弑史思明。切换各步可见双方人物奔赴同一战场。路线仅示意起止，并非实际行军路线。',
      descEn:
        'An Lushan’s rising split the Yan regime as well as the empire: An Qingxu killed his father, Shi Siming killed An Qingxu, and Shi Chaoyi killed Shi Siming. Step through to see each side converge on the same battlefields. Lines show only where people set out and arrived, not their actual routes.',
      aliases: ['安史之乱', '安史', '天宝之乱', 'An Shi Rebellion'],
      dynastyKey: 'tang',
      span: [755, 763],
      sides: {
        tang: { zh: '唐', en: 'Tang', color: '#233b8e' },
        yan: { zh: '燕', en: 'Yan', color: '#c4281c' },
      },
      cast: [
        { id: 'anlushan', person: 'anlushan', side: 'yan' },
        { id: 'anqingxu', person: 'anqingxu', side: 'yan' },
        { id: 'shisiming', person: 'shisiming', side: 'yan' },
        { id: 'shichaoyi', person: 'shichaoyi', side: 'yan' },
        { id: 'cuiqianyou', zh: '崔乾祐', en: 'Cui Qianyou', side: 'yan' },
        { id: 'tangxuanzong', person: 'tangxuanzong', side: 'tang' },
        { id: 'tangsuzong', person: 'tangsuzong', side: 'tang' },
        { id: 'yangguifei', person: 'yangguifei', side: 'tang' },
        { id: 'yangguozhong', person: 'yangguozhong', side: 'tang' },
        { id: 'guoziyi', person: 'guoziyi', side: 'tang' },
        { id: 'liguangbi', person: 'liguangbi', side: 'tang' },
        { id: 'puguhuaien', person: 'puguhuaien', side: 'tang' },
        { id: 'geshuhan', person: 'geshuhan', side: 'tang' },
        { id: 'gaoxianzhi', person: 'gaoxianzhi', side: 'tang' },
        { id: 'fengchangqing', person: 'fengchangqing', side: 'tang' },
        { id: 'yangaoqing', person: 'yangaoqing', side: 'tang' },
        { id: 'yanzhenqing', person: 'yanzhenqing', side: 'tang' },
        { id: 'zhangxun', person: 'zhangxun', side: 'tang' },
        { id: 'xuyuan', zh: '许远', en: 'Xu Yuan', side: 'tang' },
      ],
      steps: [
        { milestone: 'tang:755', month: 11, leads: ['anlushan', 'shisiming'] },
        {
          event: 'fcq-huaqing',
          leads: ['fengchangqing'],
          others: ['tangxuanzong'],
          from: { tangxuanzong: CHANGAN },
        },
        { event: 'fcq-luoyang', leads: ['anlushan', 'fengchangqing'] },
        {
          event: 'gxz-retreat',
          leads: ['fengchangqing', 'gaoxianzhi'],
          from: { gaoxianzhi: CHANGAN },
        },
        { event: 'gxz-execution', leads: ['fengchangqing', 'gaoxianzhi'] },
        {
          event: 'ygq-tumen',
          leads: ['yangaoqing'],
          others: ['yanzhenqing'],
          at: { yanzhenqing: PINGYUAN },
        },
        { event: 'ex-yan-throne', leads: ['anlushan'] },
        { event: 'ygq-fall', leads: ['shisiming', 'yangaoqing'] },
        { event: 'ygq-death', leads: ['yangaoqing', 'anlushan'] },
        { event: 'lgb-changshan', leads: ['liguangbi'], from: { liguangbi: TAIYUAN } },
        {
          event: 'lgb-jiashan',
          leads: ['guoziyi', 'liguangbi', 'shisiming'],
          others: ['puguhuaien'],
          from: { guoziyi: LINGWU, puguhuaien: LINGWU },
        },
        {
          event: 'ex-tongguan-fall',
          leads: ['geshuhan', 'cuiqianyou'],
          from: { geshuhan: CHANGAN, cuiqianyou: SHANJUN },
        },
        { event: 'gsh-captive', leads: ['geshuhan', 'anlushan'] },
        {
          event: 'ex-mawei',
          leads: ['tangxuanzong', 'yangguifei', 'yangguozhong'],
          others: ['tangsuzong'],
          from: { yangguifei: CHANGAN, yangguozhong: CHANGAN, tangsuzong: CHANGAN },
        },
        { event: 'ex-lingwu', month: 7, leads: ['tangsuzong', 'guoziyi'] },
        { event: 'ex-anlushan-death', leads: ['anqingxu', 'anlushan'] },
        { event: 'lgb-taiyuan', leads: ['shisiming', 'liguangbi'] },
        {
          event: 'ph-xiangji',
          leads: ['puguhuaien', 'guoziyi'],
          from: { puguhuaien: LINGWU },
        },
        {
          event: 'ex-suiyang',
          month: 10,
          leads: ['zhangxun'],
          others: ['xuyuan'],
          from: { zhangxun: YONGQIU },
        },
        { event: 'aqx-flee', leads: ['anqingxu'] },
        {
          event: 'tsz-return',
          leads: ['tangsuzong', 'tangxuanzong'],
          from: { tangxuanzong: CHENGDU },
        },
        { event: 'sm-surrender', leads: ['shisiming'] },
        {
          event: 'sm-wuchengen',
          leads: ['shisiming'],
          others: ['liguangbi'],
          at: { liguangbi: TAIYUAN },
        },
        {
          event: 'aqx-siege',
          leads: ['guoziyi', 'liguangbi', 'anqingxu'],
          others: ['puguhuaien'],
        },
        { event: 'sm-yanwang', leads: ['shisiming'] },
        {
          event: 'ex-yecheng',
          month: 3,
          leads: ['shisiming', 'anqingxu', 'guoziyi'],
          others: ['liguangbi'],
        },
        { event: 'sm-luoyang', leads: ['shisiming', 'liguangbi'] },
        { event: 'lgb-heyang', leads: ['liguangbi', 'shisiming'] },
        {
          event: 'lgb-mangshan',
          leads: ['shisiming', 'liguangbi'],
          others: ['puguhuaien'],
        },
        { event: 'sm-death', leads: ['shichaoyi', 'shisiming'], from: { shichaoyi: LUOYANG } },
        { event: 'ph-taiyuan', hideMonth: true, leads: ['puguhuaien'] },
        { event: 'ph-luoyang', leads: ['puguhuaien', 'shichaoyi'] },
        { event: 'scy-death', hideMonth: true, leads: ['shichaoyi'] },
        { milestone: 'tang:763', leads: [] },
      ],
    },
    {
      key: 'bawang',
      zh: '八王之乱',
      en: 'War of the Eight Princes',
      subtitleZh: '291—306 · 宗室相残与永嘉之祸',
      subtitleEn: '291–306, the Sima princes destroy their own dynasty',
      descZh:
        '贾南风借诸王铲除权臣，诸王又借彼此之手相继覆灭，十六年间八王尽死，北方胡骑乘虚而起。红色为宗王，蓝色为帝后朝臣，绿色为将领谋士，紫色为胡族首领。路线仅示意起止，并非实际行军路线。',
      descEn:
        'Empress Jia used the princes to remove her rivals, and the princes then destroyed each other. Within sixteen years the eight were dead and northern armies were rising. Red marks princes, blue the court, green officers and advisers, and purple northern leaders. Lines show only where people set out and arrived, not their actual routes.',
      aliases: ['八王之乱', '八王', 'War of the Eight Kings'],
      dynastyKey: 'xijin',
      span: [291, 306],
      sides: {
        prince: { zh: '宗王', en: 'Princes', color: '#c4281c' },
        court: { zh: '朝廷', en: 'Court', color: '#233b8e' },
        officer: { zh: '将佐', en: 'Officers', color: '#186a4b' },
        north: { zh: '胡族', en: 'Northern peoples', color: '#7a2e68' },
      },
      cast: [
        { id: 'jinhuidi', person: 'jinhuidi', side: 'court' },
        { id: 'jiananfeng', person: 'jiananfeng', side: 'court' },
        { id: 'yangjun', person: 'yangjun', side: 'court' },
        { id: 'simayu', person: 'simayu', side: 'court' },
        { id: 'zhanghua', person: 'zhanghua', side: 'court' },
        { id: 'weiguan', person: 'weiguan', side: 'court' },
        { id: 'simaliang', person: 'simaliang', side: 'prince' },
        { id: 'simawei', person: 'simawei', side: 'prince' },
        { id: 'simalun', person: 'simalun', side: 'prince' },
        { id: 'simajiong', person: 'simajiong', side: 'prince' },
        { id: 'simaai', person: 'simaai', side: 'prince' },
        { id: 'simaying', person: 'simaying', side: 'prince' },
        { id: 'simayong', person: 'simayong', side: 'prince' },
        { id: 'simayue', person: 'simayue', side: 'prince' },
        { id: 'sunxiu', person: 'sunxiu', side: 'officer' },
        { id: 'zhangfang', person: 'zhangfang', side: 'officer' },
        { id: 'luji', person: 'luji', side: 'officer' },
        { id: 'liuyuan', person: 'liuyuan', side: 'north' },
        { id: 'shile', zh: '石勒', en: 'Shi Le', side: 'north' },
      ],
      steps: [
        { event: 'yj-regent', leads: ['yangjun'], others: ['jinhuidi'] },
        { event: 'sl-xuchang', leads: ['simaliang'], others: ['yangjun'], at: { yangjun: LUOYANG } },
        {
          event: 'yj-death',
          leads: ['jiananfeng', 'simawei', 'yangjun'],
          others: ['jinhuidi'],
          from: { simawei: XIANGYANG },
        },
        {
          event: 'lw-kill',
          leads: ['simawei', 'simaliang', 'weiguan'],
          others: ['jiananfeng'],
        },
        { event: 'lw-death', leads: ['simawei', 'zhanghua'], others: ['jiananfeng'] },
        { event: 'yu-depose', leads: ['jiananfeng', 'simayu'] },
        { event: 'yu-death', leads: ['simayu'], others: ['jiananfeng'], at: { jiananfeng: LUOYANG } },
        {
          event: 'lun-coup',
          leads: ['simalun', 'sunxiu', 'jiananfeng'],
          others: ['simajiong', 'zhanghua'],
        },
        { event: 'jnf-death', leads: ['jiananfeng', 'simalun'], at: { simalun: LUOYANG } },
        { event: 'lun-throne', leads: ['simalun', 'sunxiu', 'jinhuidi'] },
        {
          event: 'jiong-rise',
          leads: ['simajiong', 'simaying', 'simayong'],
          others: ['simaai'],
          from: { simajiong: XUCHANG },
          at: { simaying: YE, simayong: CHANGAN, simaai: CHANGSHAN },
        },
        { event: 'ying-wenxian', leads: ['simaying'] },
        { event: 'lun-fall', leads: ['sunxiu', 'simalun', 'jinhuidi'] },
        {
          event: 'jiong-regent',
          leads: ['simajiong'],
          others: ['simaying'],
          at: { simaying: YE },
        },
        {
          event: 'ai-jiong',
          leads: ['simaai', 'simajiong'],
          others: ['jinhuidi', 'simayong'],
          at: { simayong: CHANGAN },
        },
        {
          event: 'zf-march',
          leads: ['zhangfang', 'simaai'],
          others: ['simayong', 'simaying'],
          from: { zhangfang: CHANGAN },
          at: { simayong: CHANGAN, simaying: YE },
        },
        {
          event: 'lj-qilijian',
          leads: ['luji', 'simaai'],
          others: ['simaying'],
          from: { luji: YE },
          at: { simaying: YE },
        },
        { event: 'ai-death', leads: ['simaai', 'simayue', 'zhangfang'] },
        {
          event: 'ying-taidi',
          leads: ['simaying'],
          others: ['simayong'],
          at: { simayong: CHANGAN },
        },
        {
          event: 'dangyin',
          leads: ['jinhuidi', 'simayue', 'simaying'],
          at: { simaying: YE },
        },
        { event: 'ying-flee', leads: ['simaying', 'jinhuidi'], others: ['zhangfang'] },
        {
          event: 'zf-abduct',
          leads: ['zhangfang', 'jinhuidi'],
          others: ['simayong', 'simaying'],
        },
        { event: 'yuan-han', leads: ['liuyuan'], from: { liuyuan: YE } },
        { event: 'yue-rise', leads: ['simayue'] },
        { event: 'zf-death', leads: ['zhangfang', 'simayong'] },
        { event: 'yue-return', leads: ['simayue', 'jinhuidi'] },
        { event: 'ying-death', leads: ['simaying'] },
        { event: 'hd-death', leads: ['jinhuidi', 'simayue'] },
        { event: 'yong-death', leads: ['simayong'] },
        { event: 'yue-death', leads: ['simayue'] },
        { event: 'yue-ningping', leads: ['shile'] },
        { milestone: 'xijin:311', leads: [] },
      ],
    },
    {
      key: 'dufu',
      zh: '杜甫一生',
      en: 'The Life of Du Fu',
      subtitleZh: '712—770 · 诗圣的漂泊与友人',
      subtitleEn: '712–770, a poet’s wandering life and friendships',
      descZh:
        '红线是杜甫一生的行迹，随步骤延伸，他始终留在地图上。部分步骤转到友人与时局：李白流放，房琯兵败，严武镇蜀，此时杜甫停在原地。蓝色为友人，绿色为帝王。路线仅示意起止，并非实际行程。',
      descEn:
        'The red line is Du Fu’s path through life, growing with each step, and he stays on the map throughout. Some steps turn to friends and events, such as Li Bai’s exile or Fang Guan’s defeat, while Du Fu stays where he is. Blue marks friends and green emperors. Lines show only where people set out and arrived, not their actual routes.',
      aliases: ['杜甫', '杜工部', '诗圣', 'Du Fu'],
      dynastyKey: 'tang',
      span: [712, 770],
      protagonist: 'dufu',
      sides: {
        hero: { zh: '杜甫', en: 'Du Fu', color: '#c4281c' },
        friend: { zh: '友人', en: 'Friends', color: '#233b8e' },
        court: { zh: '帝王', en: 'Emperors', color: '#186a4b' },
      },
      cast: [
        { id: 'dufu', person: 'dufu', side: 'hero' },
        { id: 'libai', person: 'libai', side: 'friend' },
        { id: 'gaoshi', person: 'gaoshi', side: 'friend' },
        { id: 'wangwei', person: 'wangwei', side: 'friend' },
        { id: 'fangguan', person: 'fangguan', side: 'friend' },
        { id: 'yanwu', person: 'yanwu', side: 'friend' },
        { id: 'tangxuanzong', person: 'tangxuanzong', side: 'court' },
        { id: 'tangsuzong', person: 'tangsuzong', side: 'court' },
      ],
      steps: [
        { event: 'df-birth' },
        { event: 'df-exam' },
        { event: 'ex-df-taishan' },
        { event: 'ex-df-luoyang', leads: ['libai'], from: { libai: CHANGAN } },
        { event: 'ex-df-suiyang', leads: ['libai', 'gaoshi'] },
        { event: 'df-fu', others: ['tangxuanzong'] },
        { event: 'ex-df-cien', leads: ['gaoshi'] },
        { event: 'ex-df-fengxian' },
        { side: true, event: 'ex-changan-fall', month: 6, leads: ['tangxuanzong'] },
        { side: true, event: 'fg-xuanzong', leads: ['fangguan', 'tangxuanzong'] },
        { side: true, event: 'ex-wangwei', month: 8, hideMonth: true, leads: ['wangwei'] },
        { side: true, event: 'fg-chentao', leads: ['fangguan'] },
        { side: true, event: 'lb-yongwang', leads: ['libai'] },
        { event: 'ex-df-chunwang' },
        { event: 'df-shiyi', others: ['tangsuzong'] },
        { event: 'df-plea', leads: ['fangguan'], others: ['tangsuzong'] },
        { event: 'df-huazhou' },
        { side: true, event: 'lb-yelang', leads: ['libai'] },
        { event: 'ex-df-qinzhou' },
        { event: 'df-tonggu' },
        { event: 'ex-df-caotang', leads: ['gaoshi'] },
        { event: 'df-yanwu', leads: ['yanwu'] },
        { side: true, event: 'lb-death', leads: ['libai'] },
        { event: 'ex-df-zizhou' },
        { side: true, event: 'fg-death', leads: ['fangguan'] },
        { event: 'df-drunk', leads: ['yanwu'] },
        { side: true, event: 'yw-tibet', leads: ['yanwu'] },
        { event: 'yw-death', leads: ['yanwu'] },
        { event: 'df-dongshu' },
        { event: 'ex-df-kuizhou' },
        { event: 'df-xia' },
        { event: 'df-leiyang' },
        { event: 'ex-df-end' },
      ],
    },
    {
      key: 'fujian',
      zh: '苻坚一生',
      en: 'The Life of Fu Jian',
      subtitleZh: '338—385 · 前秦天王的宏图与败亡',
      subtitleEn: '338–385, the rise and fall of Former Qin’s Heavenly King',
      descZh:
        '红线是苻坚一生的行迹，从邺城出生到新平被杀。他重用王猛统一北方，优容慕容垂、姚苌等降将，却在淝水一败之后，死于这些旧部之手。部分步骤转到他人，此时苻坚留在原地。',
      descEn:
        'The red line is Fu Jian’s path from his birth in Ye to his death at Xinping. With Wang Meng he united the north and spared defeated rivals such as Murong Chui and Yao Chang, who turned on him after the Fei River. Some steps follow others, and Fu Jian stays where he was.',
      aliases: ['苻坚', '苻永固', '前秦世祖', 'Fu Jian'],
      dynastyKey: 'dongjin',
      span: [338, 385],
      protagonist: 'fujian',
      sides: {
        hero: { zh: '苻坚', en: 'Fu Jian', color: '#c4281c' },
        qin: { zh: '前秦', en: 'Former Qin', color: '#186a4b' },
        rival: { zh: '燕与后秦', en: 'Yan and Later Qin', color: '#233b8e' },
        jin: { zh: '东晋', en: 'Eastern Jin', color: '#7a2e68' },
      },
      cast: [
        { id: 'fujian', person: 'fujian', side: 'hero' },
        { id: 'wangmeng', person: 'wangmeng', side: 'qin' },
        { id: 'furong', person: 'furong', side: 'qin' },
        { id: 'fupi', zh: '苻丕', en: 'Fu Pi', side: 'qin' },
        { id: 'murongchui', person: 'murongchui', side: 'rival' },
        { id: 'murongwei', person: 'murongwei', side: 'rival' },
        { id: 'murongchong', person: 'murongchong', side: 'rival' },
        { id: 'yaochang', person: 'yaochang', side: 'rival' },
        { id: 'huanwen', person: 'huanwen', side: 'jin' },
        { id: 'xiean', person: 'xiean', side: 'jin' },
        { id: 'xiexuan', person: 'xiexuan', side: 'jin' },
        { id: 'zhuxu', zh: '朱序', en: 'Zhu Xu', side: 'jin' },
      ],
      steps: [
        { event: 'fj-birth' },
        { event: 'fj-street' },
        { event: 'fj-longxiang' },
        { side: true, event: 'wm-huanwen', leads: ['wangmeng', 'huanwen'] },
        { event: 'wm-meet', leads: ['wangmeng'], from: { wangmeng: HUAYIN } },
        { event: 'fj-sanyuan', leads: ['yaochang'] },
        { event: 'ex-fj-throne', month: 6, others: ['wangmeng'] },
        { event: 'fj-tongbi' },
        { event: 'wm-qiangde', leads: ['wangmeng'] },
        { event: 'fj-shuofang' },
        { side: true, event: 'ex-fangtou', month: 9, leads: ['huanwen', 'murongchui'] },
        { event: 'mc-flee', leads: ['murongchui'], others: ['wangmeng'] },
        { event: 'wm-farewell', leads: ['wangmeng'] },
        { side: true, event: 'wm-luchuan', leads: ['wangmeng'], others: ['murongwei'], at: { murongwei: YE } },
        { event: 'fj-anyang', leads: ['wangmeng'] },
        { event: 'fj-ye', leads: ['murongwei'], others: ['wangmeng', 'murongchui'] },
        { event: 'fj-fangtou' },
        { event: 'wei-move', leads: ['murongwei', 'murongchong'], from: { murongchong: YE } },
        { event: 'wm-death', leads: ['wangmeng'] },
        { side: true, milestone: 'dongjin:376', month: 12 },
        { side: true, event: 'xy-fall', leads: ['fupi', 'zhuxu'], from: { fupi: CHANGAN } },
        { event: 'fj-fenzu', leads: ['fupi'] },
        { event: 'fj-debate', leads: ['furong'] },
        { event: 'fj-march', others: ['furong', 'murongchui'] },
        { event: 'fj-xiangcheng' },
        {
          event: 'fj-shouchun',
          leads: ['furong'],
          others: ['zhuxu', 'murongchui', 'murongwei'],
          at: { murongchui: YUNCHENG, murongwei: YUNCHENG },
        },
        {
          event: 'ex-feishui',
          month: 11,
          leads: ['furong', 'xiexuan'],
          others: ['xiean', 'zhuxu'],
          at: { xiean: JIANKANG },
        },
        { event: 'fj-huaibei' },
        { event: 'fj-mianchi', leads: ['murongchui'] },
        { event: 'fj-return', others: ['murongwei'] },
        { side: true, event: 'mc-rebel', leads: ['murongchui'] },
        { side: true, event: 'ys-rebel', leads: ['yaochang'] },
        { event: 'fj-zhaoshi', leads: ['yaochang'] },
        { event: 'ch-wall', leads: ['murongchong'], from: { murongchong: PINGYANG } },
        { event: 'wei-death', leads: ['murongwei'] },
        { event: 'fj-wujiang' },
        { side: true, event: 'ch-changan', leads: ['murongchong'] },
        { event: 'fj-captured', leads: ['yaochang'] },
        { event: 'fj-end', leads: ['yaochang'] },
      ],
    },
  ];
})();
