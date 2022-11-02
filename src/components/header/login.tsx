import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Form, Input, Button, Row, Col, Checkbox } from 'antd'
import Link from 'next/link'

export default function Login() {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <li className="login" onClick={openModal}>
        <span>Log In/Sign Up</span>
      </li>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" open={isOpen} onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="dialog-box">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="dialog">
                  <div className="title">
                    <h3> Log In / Sign Up</h3>
                    <div className="closed" onClick={closeModal}>
                      <img src="/assets/image/icon_closed.png" alt="closed" />
                    </div>
                  </div>
                  <div className={'password-box'}>
                    <Form name="normal_login" className="login-form" initialValues={{ remember: true }}>
                      <Form.Item
                        name={['user', 'email']}
                        // label="Email"
                        rules={[
                          { required: true, message: 'Please enter your email address!' },
                          {
                            pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                            message: '邮箱格式不正确',
                          },
                        ]}
                      >
                        <Input placeholder="Email Address" />
                        <img src="assets/image/icon_email.png" alt="email" />
                      </Form.Item>
                      <Form.Item rules={[{ type: 'number' }]} className={'log-code'}>
                        <Row gutter={12} className={'code-box'}>
                          <Col span={12}>
                            <Form.Item
                              name="captcha"
                              noStyle
                              rules={[{ required: true, message: 'Please enter the verification code!' }]}
                            >
                              <Input placeholder="Verification Code" />
                              <img src="assets/image/icon_code.png" alt="code" />
                              <span className="send-code">Send code</span>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                          Log in
                        </Button>
                        {/* {errTit ? <p style={{ marginTop: '16px', color: 'red' }}>邮箱或者验证码不正确,请重新输入</p> : null} */}
                      </Form.Item>
                      <Form.Item>
                        <div className="agree-box">
                          <Checkbox className="checkbox"></Checkbox>
                          <p className="agree">
                            I agree to WAVE&apos;s <Link href="/b">Terms of Service</Link> and{' '}
                            <Link href="/a">Privacy Policy</Link>
                          </p>
                        </div>
                      </Form.Item>
                    </Form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
