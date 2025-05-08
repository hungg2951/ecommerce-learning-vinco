"use client";
import { useCart } from "@/components/context/CartContext";
import { Button, Radio } from "antd";
import { Check, RefreshCw, ShieldCheck, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Form, Input, Select, Row, Col, Card, Typography } from "antd";

const { Title, Text } = Typography;
const { Option } = Select;

const shippingOptions = [
  {
    label: "Standard Shipping",
    description: "Delivery in 5-7 business days",
    price: 0,
    value: "standard",
  },
  {
    label: "Express Shipping",
    description: "Delivery in 2-3 business days",
    price: 12.99,
    value: "express",
  },
  {
    label: "Overnight Shipping",
    description: "Delivery the next business day",
    price: 24.99,
    value: "overnight",
  },
];

const Checkout = () => {
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [selected, setSelected] = useState("standard");
  const [priceShip, setPriceShip] = useState(0);

  const router = useRouter();

  const { cartItems, getTotalPrice, toggleCart } = useCart();

  useEffect(() => {
    document.title = "Checkout - NextShop";
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/products");
    }
  }, [cartItems]); 

  const onSubmit = () => {
    if (checkoutStep === 1) {
      setCheckoutStep(2);
      window.scrollTo(0, 0);
      return;
    }

    // If on payment step, go to review step
    if (checkoutStep === 2) {
      setCheckoutStep(3);
      window.scrollTo(0, 0);
      return;
    }
  };
  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <div className="flex items-center">
          <div className="flex items-center relative">
            <div
              className={`rounded-full w-8 h-8 ${
                checkoutStep > 1 ? "bg-blue-600" : "bg-blue-600"
              } text-white flex items-center justify-center`}
            >
              {checkoutStep > 1 ? <Check className="h-4 w-4" /> : "1"}
            </div>
            <div className="absolute top-0 -ml-4 text-xs font-medium text-blue-600 mt-10 w-16 text-center">
              Cart
            </div>
          </div>
          <div
            className={`flex-auto border-t-2 ${
              checkoutStep >= 2 ? "border-blue-600" : "border-gray-300"
            }`}
          ></div>
          <div className="flex items-center relative">
            <div
              className={`rounded-full w-8 h-8 ${
                checkoutStep > 2
                  ? "bg-blue-600"
                  : checkoutStep === 2
                  ? "bg-blue-600"
                  : "bg-gray-300"
              } ${
                checkoutStep >= 2 ? "text-white" : "text-gray-600"
              } flex items-center justify-center`}
            >
              {checkoutStep > 2 ? <Check className="h-4 w-4" /> : "2"}
            </div>
            <div
              className={`absolute top-0 -ml-12 text-xs font-medium ${
                checkoutStep >= 2 ? "text-blue-600" : "text-gray-500"
              } mt-10 w-24 text-center`}
            >
              Shipping & Billing
            </div>
          </div>
          <div
            className={`flex-auto border-t-2 ${
              checkoutStep >= 3 ? "border-blue-600" : "border-gray-300"
            }`}
          ></div>
          <div className="flex items-center relative">
            <div
              className={`rounded-full w-8 h-8 ${
                checkoutStep > 3
                  ? "bg-blue-600"
                  : checkoutStep === 3
                  ? "bg-blue-600"
                  : "bg-gray-300"
              } ${
                checkoutStep >= 3 ? "text-white" : "text-gray-600"
              } flex items-center justify-center`}
            >
              {checkoutStep > 3 ? <Check className="h-4 w-4" /> : "3"}
            </div>
            <div
              className={`absolute top-0 -ml-8 text-xs font-medium ${
                checkoutStep >= 3 ? "text-blue-600" : "text-gray-500"
              } mt-10 w-16 text-center`}
            >
              Payment
            </div>
          </div>
          <div
            className={`flex-auto border-t-2 ${
              checkoutStep >= 4 ? "border-blue-600" : "border-gray-300"
            }`}
          ></div>
          <div className="flex items-center relative">
            <div
              className={`rounded-full w-8 h-8 ${
                checkoutStep === 4 ? "bg-blue-600" : "bg-gray-300"
              } ${
                checkoutStep === 4 ? "text-white" : "text-gray-600"
              } flex items-center justify-center`}
            >
              4
            </div>
            <div
              className={`absolute top-0 -ml-6 text-xs font-medium ${
                checkoutStep === 4 ? "text-blue-600" : "text-gray-500"
              } mt-10 w-12 text-center`}
            >
              Review
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 my-14">
        <div className="lg:w-2/3">
          <Col className="border-0">
            <Card title="Shipping Information">
              <Form layout="vertical">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="First Name"
                      name="firstName"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Last Name"
                      name="lastName"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Street Address"
                  name="address"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="City"
                      name="city"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Postal Code"
                      name="postalCode"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="State/Province"
                      name="state"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Country"
                      name="country"
                      rules={[{ required: true }]}
                    >
                      <Select placeholder="Select Country">
                        <Option value="US">United States</Option>
                        <Option value="VN">Vietnam</Option>
                        <Option value="UK">United Kingdom</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Phone Number"
                      name="phone"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Email Address"
                      name="email"
                      rules={[{ required: true, type: "email" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>

          <Card style={{ marginTop: 24 }} styles={{ body: { padding: 24 } }}>
            <Title level={4}>Shipping Method</Title>
            <Radio.Group
              onChange={(e) => setSelected(e.target.value)}
              value={selected}
              style={{ width: "100%" }}
            >
              <Row gutter={[0, 16]}>
                {shippingOptions.map((option) => (
                  <Col span={24} key={option.value}>
                    <Card
                      style={{
                        border:
                          selected === option.value
                            ? "2px solid #1677ff"
                            : "1px solid #d9d9d9",
                        borderRadius: 8,
                      }}
                      styles={{
                        body: { display: "flex", alignItems: "center" },
                      }}
                    >
                      <Radio
                        value={option.value}
                        style={{ marginRight: 16 }}
                        onClick={() => setPriceShip(option.price)}
                      />
                      <div>
                        <Text strong>{option.label}</Text>
                        <br />
                        <Text type="secondary">{option.description}</Text>
                        <br />
                        <Text style={{ fontWeight: "bold" }}>
                          {option.price === 0 ? (
                            "Free"
                          ) : (
                            <span>${option.price}</span>
                          )}
                        </Text>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Radio.Group>

            <Row justify="space-between" style={{ marginTop: 24 }}>
              <Button type="default" onClick={()=>router.push('/products')}>← Continue Shopping</Button>
              <Button type="primary" onClick={onSubmit}>
                Continue to Payment
              </Button>
            </Row>
          </Card>
        </div>
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            {cartItems.length === 0 ? (
              <div className="py-4 text-center text-gray-500">
                <p>Your cart is empty</p>
                <Button
                  onClick={() => router.push("/products")}
                  variant="link"
                  className="mt-4 text-blue-600 hover:text-blue-800"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {cartItems.map((item: TCartItem) => (
                  <div key={item.id} className="py-4 flex">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p className="ml-4">
                            $
                            {(parseFloat(item.price) * item.quantity!).toFixed(
                              2
                            )}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Qty {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>
                  {priceShip === 0 ? "Free" : <span>${priceShip}</span>}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>$0</span>
              </div>
            </div>

            <div className="mt-4 border-t border-gray-200 pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${(getTotalPrice() + priceShip).toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center mb-4">
                <ShieldCheck className="text-gray-600 mr-3 h-5 w-5" />
                <p className="text-gray-600 text-sm">
                  Secure checkout - we protect your personal information
                </p>
              </div>
              <div className="flex items-center mb-4">
                <Truck className="text-gray-600 mr-3 h-5 w-5" />
                <div>
                  <h3 className="font-medium">Free Shipping</h3>
                  <p className="text-gray-600 text-sm">
                    Free standard shipping on orders over $50
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <RefreshCw className="text-gray-600 mr-3 h-5 w-5" />
                <div>
                  <h3 className="font-medium">Easy Returns</h3>
                  <p className="text-gray-600 text-sm">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
