// 设计拓扑图节点数据结构
const topoData = [{
    title: 'BakSAN拓扑',
    areas: [{
        title: '上塘路机房',
        nodes: [{
            id: 9394,
            ip: ['190.190.1.193', '190.190.1.194'],
            port: [23],
            floor: '上塘路机房-3F',
            tag: '8Gb',
            terminals: [{
                title: '物理机',
                machines: [{
                  ip: '190.190.1.193',
                  port: 23,
                }, {
                  ip: '190.190.1.193',
                  port: 23,
                }]
              },
              {
                title: '宿主机',
                machines: [{
                  ip: '190.190.1.193',
                  port: 23,
                }, {
                  ip: '190.190.1.193',
                  port: 23,
                }]
              },
              {
                title: '存储',
                machines: [{
                  ip: '190.190.1.193',
                  port: 23,
                }, {
                  ip: '190.190.1.193',
                  port: 23,
                }]
              },
              {
                title: '带库',
                machines: [{
                  ip: '190.190.1.193',
                  port: 23,
                }, {
                  ip: '190.190.1.193',
                  port: 23,
                }]
              }
            ]
          },
          {
            id: 9192,
            ip: ['190.190.1.191', '190.190.1.192'],
            port: [43, 47],
            floor: '上塘路机房-4F',
            tag: '16Gb'
          }
        ]
      },
      {
        title: '同城机房',
        nodes: [{
          id: 211212,
          ip: ['190.190.102.211', '190.190.102.212'],
          port: [47],
          tag: '16Gb'
        }]
      }
    ]
  },
  {
    title: 'CoreSAN拓扑',
    areas: [{
        title: '上塘路机房',
        nodes: [{
            id: 6162,
            ip: ['190.190.1.161', '190.190.1.162'],
            port: ['34,35'],
            floor: '上塘路机房-3F',
            tag: '8Gb'
          },
          {
            id: 6566,
            ip: ['190.190.1.165', '190.190.1.166'],
            port: ['44,45', 47],
            floor: '上塘路机房-4F',
            tag: '16Gb'
          }
        ]
      },
      {
        title: '同城机房',
        nodes: [{
          id: 219220,
          ip: ['190.190.102.219', '190.190.102.220'],
          port: [47],
          tag: '16Gb'
        }]
      }
    ]
  },
  {
    title: '3DCSAN拓扑',
    areas: [{
        title: '上塘路机房',
        nodes: [{
          id: 6364,
          ip: ['190.190.1.163', '190.190.1.164'],
          port: ['ge0'],
          tag: '8Gb'
        }]
      },
      {
        title: '合肥机房',
        nodes: [{
          id: 163164,
          ip: ['190.190.1.163', '190.190.1.164'],
          port: ['ge0', 'ge1'],
          tag: '8Gb'
        }]
      },
      {
        title: '同城机房',
        nodes: [{
          id: 217218,
          ip: ['190.190.102.217', '190.190.102.218'],
          port: ['ge0'],
          tag: '8Gb'
        }]
      }
    ]
  },
  {
    title: 'MidSAN拓扑',
    areas: [{
        title: '上塘路机房',
        nodes: [{
            id: 71,
            ip: ['190.190.1.171', '190.190.1.172'],
            port: ['35,36'],
            tag: '8Gb'
          },
          {
            id: 77,
            ip: ['190.190.1.177', '190.190.1.178'],
            port: ['0,1'],
            tag: '8Gb'
          },
          {
            id: 79,
            ip: ['190.190.1.179', '190.190.1.180'],
            port: ['46,47'],
            tag: '8Gb'
          },
          {
            id: 73,
            ip: ['190.190.1.173', '190.190.1.174'],
            port: ['34,35', '22,23', '38,39', '17,18', '20,21'],
            tag: '8Gb'
          },
          {
            id: 75,
            ip: ['190.190.1.175', '190.190.1.176'],
            port: ['0,1', '38,39', '31'],
            tag: '8Gb'
          },
          {
            id: 81,
            ip: ['190.190.1.181', '190.190.1.182'],
            port: ['94,95'],
            tag: '16Gb'
          },
          {
            id: 83,
            ip: ['190.190.1.183', '190.190.1.184'],
            port: ['46,47'],
            tag: '16Gb'
          },
          {
            id: 85,
            ip: ['190.190.1.185', '190.190.1.186'],
            port: ['46,47'],
            tag: '16Gb'
          },
          {
            id: 201,
            ip: ['190.190.1.201', '190.190.1.202'],
            port: ['46,47'],
            tag: '16Gb'
          },
          {
            id: 87,
            ip: ['190.190.1.187', '190.190.1.188'],
            port: ['46,47', '40,41', '44,45', '42,43'],
            tag: '16Gb'
          },
          {
            id: 89,
            ip: ['190.190.1.189', '190.190.1.190'],
            port: ['46,47'],
            tag: '16Gb'
          },
          {
            id: 203,
            ip: ['190.190.1.203', '190.190.1.204'],
            port: ['46,47'],
            tag: '16Gb'
          }
        ]
      },
      {
        title: '同城机房',
        layout: 'vertical',
        nodes: [{
          id: 171,
          ip: ['190.190.102.171', '190.190.102.172'],
          port: ['0,1', 35],
          tag: '8Gb'
        }, {
          id: 215,
          ip: ['190.190.102.215', '190.190.102.216'],
          port: [38],
          tag: '8Gb'
        }]
      }
    ]
  }
]


let topoLinks = [
  [{
    source: 9394,
    target: 9192,
    tag: '8Gb',
    sourcePort: 23,
    targetPort: 43
  }, {
    source: 9192,
    target: 211212,
    tag: '裸光纤16Gb',
    sourcePort: 47,
    targetPort: 47
  }],
  [{
    source: 6162,
    target: 6566,
    tag: '8Gb',
    sourcePort: '34,35',
    targetPort: '44,45'
  }, {
    source: 6566,
    target: 219220,
    tag: '裸光纤16Gb',
    sourcePort: 47,
    targetPort: 47
  }],
  [{
    source: 6364,
    target: 163164,
    tag: '300Mb',
    sourcePort: 'ge0',
    targetPort: 'ge0'
  }, {
    source: 163164,
    target: 217218,
    tag: '150Mb',
    sourcePort: 'ge1',
    targetPort: 'ge0'
  }],
  [{
    source: 73,
    target: 71,
    tag: '8Gb',
    sourcePort: '22,23',
    targetPort: '35,36'
  }, {
    source: 73,
    target: 79,
    tag: '8Gb',
    sourcePort: '34,35',
    targetPort: '46,47'
  }, {
    source: 73,
    target: 75,
    tag: '8Gb',
    sourcePort: '38,39',
    targetPort: '0,1'
  }, {
    source: 73,
    target: 81,
    tag: '8Gb',
    sourcePort: '17,18',
    targetPort: '94,95'
  }, {
    source: 73,
    target: 83,
    tag: '8Gb',
    sourcePort: '20,21',
    targetPort: '46,47'
  }, {
    source: 75,
    target: 77,
    tag: '8Gb',
    sourcePort: '38,39',
    targetPort: '0,1'
  }, {
    source: 75,
    target: 171,
    tag: 'DWDM 4Gb',
    sourcePort: '31',
    targetPort: '0,1'
  }, {
    source: 87,
    target: 85,
    tag: '裸光纤16Gb',
    sourcePort: '46,47',
    targetPort: '46,47'
  }, {
    source: 87,
    target: 89,
    tag: '裸光纤16Gb',
    sourcePort: '44,45',
    targetPort: '46,47'
  }, {
    source: 87,
    target: 201,
    tag: '裸光纤16Gb',
    sourcePort: '40,41',
    targetPort: '46,47'
  }, {
    source: 87,
    target: 203,
    tag: '裸光纤16Gb',
    sourcePort: '42,43',
    targetPort: '46,47'
  }, {
    source: 171,
    target: 215,
    tag: '8Gb',
    sourcePort: 35,
    targetPort: 38
  }]
]
