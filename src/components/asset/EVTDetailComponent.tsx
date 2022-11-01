import { EVTDetail } from 'model/evt_asset'
import React, { useEffect, useState } from 'react'
import Http from 'services/http'

export default function EVTDetailComponent(props) {
  const { id } = props
  const [evtDetail, setEvtDetail] = useState<EVTDetail>()

  useEffect(() => {
    getEvtDetail()
  })

  const getEvtDetail = async () => {
    await Http.getInstance()
      .getEvtDetail(id)
      .then(response => {
        setEvtDetail(response.result)
      })
      .catch(error => {
        console.log(error)
      })
  }
  if (!evtDetail) {
    return <></>
  }

  return (
    <div className="evt-detail">
      <div className="info">
        <img src={evtDetail.image} alt={evtDetail.name} />

        <div className="detail">
          <h2>{evtDetail.name}</h2>
          <div className="evt-tag">EVT</div>
          <div className="statics">
            <div className="item">
              <p>85</p>
              <p>items</p>
            </div>
            <div className="item">
              <p>213</p>
              <p>Owners</p>
            </div>
            <div className="item">
              <p>4200</p>
              <p>Floor Price</p>
            </div>
            <div className="item">
              <p>8400</p>
              <p>Volume Traded</p>
            </div>
          </div>
          <div className="chain-info">
            <div className="item">
              <p>Contract Address</p>
              <p>1231232</p>
            </div>
            <div className="item">
              <p>Token Standard</p>
              <p>1231232</p>
            </div>
            <div className="item">
              <p>Block chain</p>
              <p>1231232</p>
            </div>
            <div className="item">
              <p>Creator Earnings</p>
              <p>1231232</p>
            </div>
          </div>
          <div className="license">
            <p>License</p>
            <p>{'>'}</p>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  )
}
