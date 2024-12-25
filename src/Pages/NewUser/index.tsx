import "./newUser.css";
import { Button, Form, Input, Modal } from "antd";
import { addUser } from "../../Features/AddUser/addUsersSlice";
import { editUser } from "../../Features/EditUser/editUsersSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { firstAndLastNameRules, imageRules } from '../../Utility/helperFunctions'

const NewUser = (props: any) => {
  const [form] = Form.useForm();
  let { open, setOpen, isEdit, record } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if(record){
      form.setFieldsValue(record);
    }
  },[form,record])

  const onFinish = (values: any) => {
    if(isEdit){
      dispatch(editUser({values}));
    }else{
      dispatch(addUser({values}));
      form.resetFields();
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };
  
  return (
    <Modal
      open={open}
      className="modalStyle"
      title={`${isEdit ? "Edit User" : "Create New User"}`}
      onCancel={handleCancel}
      footer={null} 
    >
      <div className="new-user-container">
        <Form
          className="new-user-form"
          form={form}
          layout="vertical"
          name="CreateNewUser"
          onFinish={onFinish}
          style={{ maxWidth: 500 }}
        >
          <Form.Item
            name="first_name"
            label="First Name"
            rules={firstAndLastNameRules}
            required
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Last Name"
            rules={firstAndLastNameRules}
            required
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="avatar"
            label="Profile Image Link"
            rules={imageRules}
            required
          >
            <Input />
          </Form.Item>
          <Form.Item className="btn-container">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={handleCancel} >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default NewUser;
