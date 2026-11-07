// Storylines (纪事本末): curated, ordered steps that tell one historical story.
// Load after the lore files.
//
// cast:  { id, person?, zh?, en?, side }. `person` links a PERSON_PROFILES key; without it the
//        member is a name only, so a story never depends on adding a full profile first.
// steps: { event | milestone, leads, others, from?, at?, month?, hideMonth? }
//   event      id of a PLACE_LANDMARK_EVENTS entry
//   milestone  'dynastyKey:year' of a dynasty milestone
//   leads      cast ids who are the main participants of this step
//   others     cast ids who take part in a supporting role
//   from       { castId: coord } where someone sets out from, when no earlier step places them
//   at         { castId: coord } where someone is, when that is not the event's site
//   month      lunar month for this step, when the event itself has none
//   hideMonth  true when the month is uncertain: it still orders the step but is not shown
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
  ];
})();
