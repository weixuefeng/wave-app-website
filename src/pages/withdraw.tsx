import React, { useEffect, useState } from 'react'
import { Form, Input, Select, Row, Col } from 'antd'
import NormalLayout from 'components/layout/normalLayout'
import useWallet from 'hooks/userWallet'
import { PageModel } from 'model/navModel'
import { WalletAccount } from 'model/wallet'

export default function Withdraw() {
  let pageModel = new PageModel('Withdraw', 'WAVE', '')

  const { Option } = Select

  const wallet = useWallet()

  const [walletAccount, setWalletAccount] = useState<WalletAccount>()

  useEffect(() => {
    if (wallet) {
      setWalletAccount(wallet.wallet_accounts[0])
    }
  }, [wallet])

  if (!walletAccount) {
    return <></>
  }

  function content() {
    return (
      <div className="container mx-auto">
        <div className="withdraw">
          <p className="title">Withdraw</p>
          <div className="token">
            <p className="mr-3">Token:</p>
            <img className="mr-1" src="/assets/image/icon_newton.png" alt="" />
            <p>NEW</p>
            <p className="label">{walletAccount.label}</p>
          </div>

          <Form
            name="basic"
            layout="vertical"
            className="withdraw-form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Row>
              <Col span={12}>
                <Form.Item label="Withdrawal Network" name="network">
                  <Select>
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12} offset={-12}>
                <Form.Item
                  label="Withdrawal Address"
                  name="address"
                  rules={[
                    { required: true, message: 'This address does not match the currently selected primary network.' },
                  ]}
                >
                  <Input className="withdraw-input" placeholder={'Enter or paste address'} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Amount"
                  name="Amount"
                  tooltip="This is a required field"
                  rules={[{ required: true, message: 'Insufficient balance' }]}
                >
                  <Input className="withdraw-input" suffix="NEW" placeholder={'Minimum0'} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Fee">
                  <p className="text-gray999">21NEW</p>
                </Form.Item>
              </Col>

              <Col span={24}>
                <div className="tips">
                  <p className="tips_title">Reminder</p>
                  <p>* WAVE will never ask you to transfer funds to another account.</p>
                  <p>
                    * Beware of fraud and don't participate in illegal activities such as proxy purchases, money
                    laundering, and illegal fundraising.
                  </p>
                  <p>* Internal transfer will be free.</p>
                </div>
              </Col>

              <Col span={12}>
                <Form.Item>
                  <button className="primary black">Confirm</button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    )
  }

  return NormalLayout(content(), pageModel)
}
