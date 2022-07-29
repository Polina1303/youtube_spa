import React, { useState } from "react";
import {
  Input,
  Form,
  Select,
  Col,
  InputNumber,
  Row,
  Slider,
  Button,
} from "antd";
import { favoritesAction } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";

function AddFavorites({ setVisibleFavorites, isDisabled, valueRequest }) {
  let dispatch = useDispatch();

  function onFinish(dataForm) {
    let id = new Date();
    let user = localStorage.getItem("login");
    const data = { user, id, ...dataForm };
    dispatch(favoritesAction(data));
    setVisibleFavorites(false);
    console.log("dispatch", data);
  }

  const array = useSelector((state) => state.favorite);
  console.log("array", array);

  const IntegerStep = () => {
    const [inputValue, setInputValue] = useState(1);

    const onChange = (newValue) => {
      setInputValue(newValue);
    };

    return (
      <Row>
        <Col span={12}>
          <Slider
            min={1}
            max={50}
            onChange={onChange}
            value={typeof inputValue === "number" ? inputValue : 0}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={1}
            max={50}
            style={{
              margin: "0 16px",
            }}
            value={inputValue}
            onChange={onChange}
          />
        </Col>
      </Row>
    );
  };

  const onReset = () => {
    setVisibleFavorites(false);
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <h3>Сохраненный запрос</h3>
        <Form onFinish={onFinish}>
          <Form.Item label="Запрос" initialValue={valueRequest} name="request">
            <Input id="request" disabled={isDisabled}></Input>
          </Form.Item>

          <Form.Item
            label="Название"
            name="name"
            rules={[
              {
                required: true,
                message: "Укажите название!",
              },
            ]}
          >
            <Input placeholder="Укажите название" />
          </Form.Item>

          <Form.Item label="Сортировать по">
            <Select placeholder="Без сортировки">
              <Select.Option value="data">Дате</Select.Option>
              <Select.Option value="views">Количество просмотров</Select.Option>
            </Select>
          </Form.Item>
          <IntegerStep />
          <Button
            htmlType="button"
            onClick={onReset}
            size={"large"}
            style={{ width: "200px", marginRight: "15px", marginTop: "15px" }}
          >
            Не сохранять
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size={"large"}
            style={{ width: "200px" }}
          >
            Сохранить
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddFavorites;
