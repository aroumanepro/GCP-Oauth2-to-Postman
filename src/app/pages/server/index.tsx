import { Space, Switch, Tabs, TabsProps, Timeline } from "antd";
import React from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useServer, ServerProvider } from "../../contexts/server.context";

const ServerPage: React.FC = () => {
  const { serverStatus, startServer, stopServer, logs } = useServer();

  const _onChangeChecked = async (checked: boolean) => {
    if (checked) {
      await startServer();
    } else {
      await stopServer();
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Server",
      children: (
        <Space direction="vertical">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={_onChangeChecked}
            checked={serverStatus}
          />
        </Space>
      ),
    },
    {
      key: "2",
      label: "Logs",
      children: <Timeline items={logs} />,
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
};

const App: React.FC = () => (
  <ServerProvider>
    <ServerPage />
  </ServerProvider>
);

export default App;
