import useWallet from 'hooks/userWallet'
import { OfferType } from 'model/offer'
import { UserInfo } from 'model/user'
import React, { useEffect } from 'react'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppSelector } from 'store/store'

export default function Assets() {
  const currentUser = useAppSelector(selectUser) as UserInfo

  useEffect(() => {
    if (currentUser) {
      getMyAssetList()
    }
  }, [currentUser])

  function getOrderOnSale() {
    Http.getInstance()
      .getOrderOnSale(currentUser.id, 1)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  function getOrderOffer() {
    Http.getInstance()
      .getOrderOffer(currentUser.id, 1, OfferType.MADE)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  function getMyAssetList() {
    Http.getInstance()
      .getMyAssetList(currentUser.id, 1)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return <div>assets</div>
}
