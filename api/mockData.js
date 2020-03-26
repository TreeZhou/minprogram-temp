const Mock = require('./mockjs/index.js');
const Random = Mock.Random;

function multiple(template, mun = 10) {
  let arr = [];
  for (let i = 0; i < mun; i++) {
    arr.push(template());
  }
  return arr;
}

const data = multiple(function() {
  return [
    {
      gift_id: Random.string(10, 20),
      provider_id: Random.string(10, 20),
      gift_name: Random.string(10, 20),
      gift_img: '/assets/default.png',
      gift_score: Random.integer(1, 50),
      gift_type: Random.string(10, 20),
      gift_sequence: Random.integer(1, 1000),
      start_at: Random.date('yyyy-MM-dd hh:mm').replace(/-/g, '/'),
      end_at: Random.date('yyyy-MM-dd hh:mm').replace(/-/g, '/'),
      stock: Random.integer(1, 1000),
      is_on_sale: Random.integer(1, 2),
      description: Random.name(10, 20)
    }
  ];
});

export default {
  data: {
    ok: true,
    result: {
      list: data
    }
  },
  //兔展错误信息模板
  error: {
    ok: false,
    error_code: -1101,
    message: '驱赶失败 : 驱赶次数不足',
    msg: '驱赶次数不足'
  }
};
