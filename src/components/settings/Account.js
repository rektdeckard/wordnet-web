import React, { useState, useEffect } from "react";
import { Storage, Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import {
  Layout,
  Typography,
  Card,
  Avatar,
  Upload,
  message,
  List,
  Row,
  Col,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

const Account = (props) => {
  const [user, setUser] = useState(props.authData.attributes);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    setLoading(true);
    try {
      const images = await Storage.list("profile/", { level: "protected" });
      if (images.length) {
        const imageUrl = await Storage.get(images[0].key, {
          level: "protected",
        });
        setImage(imageUrl);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleUpload = async ({ onProgress, onError, onSuccess, file }) => {
    if (file) {
      const response = await Storage.put(`profile/${file.name}`, file, {
        contentType: "image/*",
        level: "protected",
      });
      console.info(response);
      fetchImage();
    }
  };

  const onChangeAttribute = async (attribute, value) => {
    if (user[attribute] === value) return;

    try {
      const response = await Auth.updateUserAttributes(Auth.user, {
        [attribute]: value,
      });
      if (response === "SUCCESS") {
        const { attributes } = await Auth.currentUserInfo();
        setUser(attributes);
        message.success(`Updated ${attribute}`);
      } else message.warn(`Could not update ${attribute}`);
    } catch (e) {
      message.error(e.message);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      {loading ? null : <div className="ant-upload-text">Upload</div>}
    </div>
  );

  return (
    <Layout>
      <Card title="User Details" bordered={false}>
        <Row>
          <Col span={4} style={{ minWidth: 128 }}>
            <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              customRequest={handleUpload}
              beforeUpload={validateFile}
            >
              {image ? (
                <Avatar
                  src={image}
                  shape="square"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Col>
          <Col span={20}>
            <List itemLayout="horizontal" size="small">
              <List.Item>
                <List.Item.Meta
                  title="Name"
                  description={
                    <Paragraph
                      editable={{
                        onChange: (value) => onChangeAttribute("name", value),
                      }}
                    >
                      {user.name}
                    </Paragraph>
                  }
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title="Phone"
                  description={
                    <Paragraph
                      editable={{
                        onChange: (value) =>
                          onChangeAttribute("phone_number", value),
                      }}
                    >
                      {user.phone_number}
                    </Paragraph>
                  }
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title="Email"
                  description={
                    <Paragraph
                      editable={{
                        onChange: (value) => onChangeAttribute("email", value),
                      }}
                    >
                      {user.email}
                    </Paragraph>
                  }
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title="Address"
                  description={
                    <Paragraph
                      editable={{
                        onChange: (value) =>
                          onChangeAttribute("address", value),
                      }}
                    >
                      {user.address ?? "Not provided"}
                    </Paragraph>
                  }
                />
              </List.Item>
            </List>
          </Col>
        </Row>
      </Card>
    </Layout>
  );
};

function validateFile(file) {
  if (!file.type === "image/*") {
    message.error("Unsupported file type!");
    return false;
  }
  if (!(file.size / 1024 / 1024 < 4)) {
    message.error("Image must smaller than 4MB!");
    return false;
  }
  return true;
}

export default withAuthenticator(Account);
