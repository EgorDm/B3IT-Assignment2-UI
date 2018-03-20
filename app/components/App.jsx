import React from 'react';
import DynamicForm from './DynamicForm';
import FormInput from './FormInput';
import Panel from './Panel';

const App = () => {
  return (
    <div>
      <div className="container">
        <h1 className="text-center mt-5">Planetron Settings</h1>
        <div className="row justify-content-center">
          <div className="col-md-8 mt-4">
            <Panel title="Network settings">
              <DynamicForm action="/">
                <FormInput name="ssid" type="text" label="Network SSID"/>
                <FormInput name="password" type="password" label="Network Password"/>
              </DynamicForm>
            </Panel>
          </div>
          <div className="col-md-8 mt-4">
            <Panel title="MQTT Settings">
              <DynamicForm action="/settings" method="put" data_path="/settings">
                <FormInput name="broker" type="text" label="Broker"/>
                <FormInput name="port" type="number" label="Port"/>
                <FormInput name="cid" type="text" label="Client ID"/>
                <FormInput name="username" type="text" label="Username"/>
                <FormInput name="password" type="password" label="Password"/>
                <FormInput name="rx-topic" type="text" label="RX Topic"/>
                <FormInput name="tx-topic" type="text" label="TX Topic"/>
                <FormInput name="pw-enable" type="checkbox" label="Enable Password"/>
              </DynamicForm>
            </Panel>
          </div>
          <div className="col-md-8 mt-4">
            <Panel title="Debug">
              <DynamicForm action="/settings" method="put" data_path="/settings">
                <FormInput name="debug_enable" type="checkbox" label="Enable"/>
                <FormInput name="baud" type="number" label="Baud"/>
              </DynamicForm>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
