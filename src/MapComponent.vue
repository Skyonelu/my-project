<template>
    <div>
      <div ref="mapContainer" style="width: 100%; height: 600px;"></div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import * as echarts from 'echarts'
  
  export default {
    setup() {
      const mapContainer = ref(null)
  
      onMounted(() => {
        initMap(mapContainer.value)
      })
  
      const initMap = (container) => {
        const myChart = echarts.init(container)
  
        // 加载中国地图数据
        const mapData = require('@/assets/china.json')
  
        // 根据地图数据初始化图表
        echarts.registerMap('china', mapData)
  
             // 地图配置项
      const option = {
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: '{b}'
        },
        geo: {
          map: 'china',
          roam: true,
          zoom: 0.1, // 调整缩放级别，可以根据需要进行调整
          emphasis: {
            label: {
              show: true
            }
          },
          select: {
            label: {
              show: true
            }
          }
        },
        series: [
          {
            type: 'map',
            map: 'china',
            roam: true,
            emphasis: {
              label: {
                show: true
              }
            },
            select: {
              label: {
                show: true
              }
            },
            data: [] // 你可以在这里填充各个省份的数据
          }
        ]
      }
  
        // 绑定点击事件
        myChart.on('click', (params) => {
          if (params.componentType === 'series') {
            // 点击到省份
            console.log('省份名称:', params.name)
            // 这里可以根据点击的省份加载市县数据，并更新图表
          }
        })
  
        // 设置地图样式
        myChart.setOption(option)
  
        // 添加光标闪烁和飞行航线图效果
        addCursorBlinkEffect(myChart)
        addFlyingLinesEffect(myChart)
      }
  
      const addCursorBlinkEffect = (chart) => {
        setInterval(() => {
          chart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: 0
          })
          setTimeout(() => {
            chart.dispatchAction({
              type: 'hideTip'
            })
          }, 1000)
        }, 2000)
      }
  
      const addFlyingLinesEffect = (chart) => {
        const flyingData = [
          // 航线数据示例
          { from: '北京', to: '上海' },
          { from: '北京', to: '广州' },
          { from: '上海', to: '深圳' },
          // 添加更多航线数据...
        ]
  
        const series = {
          type: 'lines',
          data: flyingData.map(item => ({
            fromName: item.from,
            toName: item.to,
            coords: [
              getCityCoord(item.from),
              getCityCoord(item.to)
            ]
          })),
          coordinateSystem: 'geo',
          zlevel: 2,
          symbol: ['none', 'arrow'],
          symbolSize: 10,
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: false
            }
          },
          lineStyle: {
            color: '#c23531',
            width: 1,
            opacity: 0.6,
            curveness: 0.2
          }
        }
  
        const option = chart.getOption
        option.series.push(series)
        chart.setOption(option)
      }
  
      const getCityCoord = (city) => {
        // 根据城市名称获取经纬度，你可以在这里自定义省份和城市的经纬度数据
        const cityCoords = {
          '北京': [116.397128, 39.916527],
          '上海': [121.472641, 31.231707],
          '广州': [113.264435, 23.129163],
          '深圳': [114.057868, 22.543099]
          // 添加更多城市经纬度数据...
        }
        return cityCoords[city]
      }
  
      return {
        mapContainer
      }
    }
  }
  </script>
  