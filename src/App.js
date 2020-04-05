import React, { Component } from 'react';

import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps'; // Marker 추가// 패키지 불러오기

class NaverMapAPI extends Component {
  constructor(props){
    super(props)
    this.state={
       count : 0,
       storeInfos : [{}]
    }
  }

  componentDidMount(){
    fetch("https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/stores/json?page=1&perPage=500").then(function(result){
      return result.json();
    }).then(function(jsonData){
      
        var list = []
        for(let i =0 ; i < jsonData.count ; i++){
          list.push(jsonData.storeInfos[i])
        }
        
       // console.log("리스트에 담긴 json 객체 : ",list)
       
        this.setState({
          count : jsonData.count,
          storeInfos : list
        })
    }.bind(this))
  }
  
  render(){
    const navermaps = window.naver.maps;

    var cntStore = this.state.count
    var infoStores = this.state.storeInfos
    var mkList = [];

    for(let i = 0 ; i <cntStore ;i++){
      
      let typeCheck = infoStores[i].type
      let str ="상호명 :" + infoStores[i].name +"\n"
      str += "주소 : " +infoStores[i].addr +"\n"
      if (typeCheck ==="01"){
        str += "약국"
      } else if(typeCheck ==="02"){
        str += "우체국"
      } else if(typeCheck ==="02"){
        str += "농협"
      }
      
      mkList.push(
        <Marker
        key={i+1}
        position={new navermaps.LatLng(infoStores[i].lat, infoStores[i].lng)}
        animation={1}
        onClick={() => {alert(str);}}
        />
      )
    }
    return (
      <NaverMap
        mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
        style={{
          width: '100%', // 네이버지도 가로 길이
          height: '85vh' // 네이버지도 세로 길이
        }}
        defaultCenter={{ lat: 37.554722, lng: 126.970833 }} // 지도 초기 위치
        defaultZoom={13} // 지도 초기 확대 배율
      >
        {mkList}
      </NaverMap>
    );
  }

}

class App extends Component {

  render(){
    return (
      

      <RenderAfterNavermapsLoaded
        ncpClientId={'tolwg4v46c'} // 자신의 네이버 계정에서 발급받은 Client ID
        error={<p>Maps Load Error</p>}
        loading={<p>Maps Loading...</p>}
      >
        <NaverMapAPI />
      </RenderAfterNavermapsLoaded>
    );
  }

}

export default App;