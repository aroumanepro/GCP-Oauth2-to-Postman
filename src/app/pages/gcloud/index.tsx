import React, { useState, useEffect } from "react";
import { Button, Space, Switch, Tabs, TabsProps, Timeline } from "antd";
import { CheckOutlined, CloseOutlined, RedoOutlined } from "@ant-design/icons";

const GcloudPage: React.FC = () => {
  const [gcloudAuthStatus, setGcloudAuthStatus] = useState<boolean>(false);
  const [gcloudAuthDefaultAppStatus, setGcloudAuthDefaultAppStatus] =
    useState<boolean>(false);
  const [logs, setLogsState] = useState<Array<any>>([]);

  const _onChangeGcloudConnectorChecked = async (checked: boolean) => {
    if (checked) {
      await runGcloudAuth();
    } else {
      await revokeGcloudAuth();
    }
  };

  const _onChangeGcloudDefaultAppChecked = async (checked: boolean) => {
    if (checked) {
      await runGcloudAuthDefaultApp();
    } else {
      await revokeGcloudAuthDefaultApp();
    }
  };

  const runGcloudAuthDefaultApp = async () => {
    try {
      const result = await window.electronAPI.runGcloudAuthDefaultApp();
      setLogs(`Gcloud Auth Default App Result: ${result}`);
      checkGcloudAuthDefaultApp();
    } catch (error) {
      setLogs(`Error during Gcloud Auth Default App: ${error.message}`);
    }
  };

  const checkGcloudAuthDefaultApp = async () => {
    try {
      const result = await window.electronAPI.checkGcloudAuthDefaultApp();
      setGcloudAuthDefaultAppStatus(result);
      setLogs(
        `Checked Gcloud Auth Default App Status: ${
          result ? "Authenticated" : "Not Authenticated"
        }`
      );
    } catch (error) {
      setGcloudAuthDefaultAppStatus(false);
      setLogs(
        `Error checking Gcloud Auth Default App Status: ${error.message}`
      );
    }
  };

  const runGcloudAuth = async () => {
    try {
      const result = await window.electronAPI.runGcloudAuth();
      setLogs(`Gcloud Auth Result: ${result}`);
      checkGcloudAuth();
    } catch (error) {
      setLogs(`Error during Gcloud Auth: ${error.message}`);
    }
  };

  const checkGcloudAuth = async () => {
    try {
      const result = await window.electronAPI.checkGcloudAuth();
      setGcloudAuthStatus(result);
      setLogs(
        `Checked Gcloud Auth Status: ${
          result ? "Authenticated" : "Not Authenticated"
        }`
      );
    } catch (error) {
      setGcloudAuthStatus(false);
      setLogs(`Error checking Gcloud Auth Status: ${error.message}`);
    }
  };

  const revokeGcloudAuth = async () => {
    try {
      const result = await window.electronAPI.revokeGcloudAuth();
      setGcloudAuthStatus(!result);
      setLogs(`Gcloud Auth Revoked: ${result ? "Success" : "Failure"}`);
      await checkGcloudAuth();
    } catch (error) {
      setLogs(`Error revoking Gcloud Auth: ${error.message}`);
      setGcloudAuthStatus(false);
    }
  };

  const revokeGcloudAuthDefaultApp = async () => {
    try {
      const result = await window.electronAPI.revokeGcloudAuthDefaultApp();
      setGcloudAuthDefaultAppStatus(!result);
      setLogs(`Gcloud Auth Revoked: ${result ? "Success" : "Failure"}`);
      await checkGcloudAuthDefaultApp();
    } catch (error) {
      setLogs(`Error revoking Gcloud Auth: ${error.message}`);
      setGcloudAuthDefaultAppStatus(false);
    }
  };

  const setLogs = (message: string) => {
    const newLog = { children: message, key: Date.now().toString() };
    setLogsState((prevLogs) => [...prevLogs, newLog]);
  };

  const checkGcloudAuthAll = () => {
    checkGcloudAuth();
    checkGcloudAuthDefaultApp();
  };

  useEffect(() => {
    checkGcloudAuth();
    checkGcloudAuthDefaultApp();
  }, []);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Gcloud connector",
      children: (
        <Space direction="vertical">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={_onChangeGcloudConnectorChecked}
            checked={gcloudAuthStatus}
          />
        </Space>
      ),
    },
    {
      key: "2",
      label: "Gcloud Default Application",
      children: (
        <Space direction="vertical">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={_onChangeGcloudDefaultAppChecked}
            checked={gcloudAuthDefaultAppStatus}
          />
        </Space>
      ),
    },
    {
      key: "3",
      label: "Logs",
      children: <Timeline items={logs} />,
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        tabBarExtraContent={
          <Button
            type="primary"
            shape="circle"
            icon={<RedoOutlined />}
            onClick={checkGcloudAuthAll}
          />
        }
        items={items}
        onChange={onChange}
      />
    </>
  );
};

export default GcloudPage;
