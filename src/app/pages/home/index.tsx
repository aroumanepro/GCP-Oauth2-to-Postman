import React, { useEffect, useState } from "react";
import { Steps, Typography, Divider, Alert, Card } from "antd";
const { Title, Paragraph, Text } = Typography;

const Home = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentPostmanStep, setCurrentPostmanStep] = useState(0);
  const [gcloudAuthStatus, setGcloudAuthStatus] = useState<boolean>(false);
  const [gcloudAuthDefaultAppStatus, setGcloudAuthDefaultAppStatus] =
    useState<boolean>(false);
  const [serverStatus, setServerStatus] = useState<boolean>(false);

  const checkGcloudAuth = async () => {
    try {
      const result = await window.electronAPI.checkGcloudAuth();
      setGcloudAuthStatus(result);
    } catch (error) {
      setGcloudAuthStatus(false);
    }
  };

  const checkGcloudAuthDefaultApp = async () => {
    try {
      const result = await window.electronAPI.checkGcloudAuthDefaultApp();
      setGcloudAuthDefaultAppStatus(result);
    } catch (error) {
      setGcloudAuthDefaultAppStatus(false);
    }
  };

  const checkServerStatus = async () => {
    const status = await window.electronAPI.getServerStatus();
    setServerStatus(status);
  };

  useEffect(() => {
    checkGcloudAuth();
    checkGcloudAuthDefaultApp();
    checkServerStatus();
    if (gcloudAuthDefaultAppStatus || gcloudAuthStatus) {
      setCurrentStep(1);
    }
    if ((gcloudAuthDefaultAppStatus || gcloudAuthStatus) && serverStatus) {
      setCurrentStep(2);
    }
  }, [gcloudAuthDefaultAppStatus, gcloudAuthStatus, serverStatus]);

  const stepsContent = [
    {
      title: "Configuration de l'authentification",
      description: (
        <Paragraph>
          Allez sur l'onglet <Text strong>gcloud</Text> du menu à gauche, puis
          allez dans l'onglet <Text strong>Gcloud Default Application</Text>.
          Cliquez sur le switch, une fenêtre s'ouvrira pour vous permettre de
          vous connecter et créer un{" "}
          <Text strong>application_default_credentials.json</Text>.
        </Paragraph>
      ),
    },
    {
      title: "Lancement de l'application",
      description: (
        <Paragraph>
          Allez sur l'onglet <Text strong>server</Text> du menu à gauche, puis
          dans l'onglet <Text strong>server</Text> cliquez sur le switch pour
          lancer le serveur. Après cela, vous verrez dans les logs le port du
          serveur par défaut : <Text code>http://localhost:8086</Text>.
        </Paragraph>
      ),
    },
    {
      title: "Test avec Postman",
      description: (
        <Paragraph>
          Utilisez Postman pour tester l'authentification avec OAuth2. Suivez
          les étapes fournies dans la section "Exemple avec Postman".
        </Paragraph>
      ),
    },
  ];

  const postmanStepsContent = [
    {
      title: "Configurer l'Oauth 2.0",
      description: (
        <Paragraph>
          Dans un premier temps, configurez une collection sur Postman.
          Choisissez le type d'authentification <Text strong>OAuth 2.0</Text>.
          <Title level={4}>Paramètres OAuth 2.0 :</Title>
          <ul>
            <h5>Configure New Token</h5>
            <li>
              <Text strong>Token Name:</Text> <Text>GCP OAuth</Text>
            </li>
            <li>
              <Text strong>Grant type:</Text> <Text>Authorization Code</Text>
            </li>
            <li>
              <Text strong>Callback URL:</Text>{" "}
              <Text code>https://oauth.pstmn.io/v1/browser-callback</Text>
            </li>
            <li>
              <Text strong>Auth URL:</Text>{" "}
              <Text code>http://localhost:8086/auth2/auth</Text>
            </li>
            <li>
              <Text strong>Access Token URL:</Text>{" "}
              <Text code>http://localhost:8086/token</Text>
            </li>
            <li>
              <Text strong>Client ID:</Text> <Text></Text>
            </li>
            <li>
              <Text strong>Client Secret:</Text> <Text></Text>
            </li>
            <li>
              <Text strong>Scope:</Text> <Text></Text>
            </li>
            <li>
              <Text strong>State:</Text> <Text></Text>
            </li>
            <li>
              <Text strong>Client Authentication:</Text>{" "}
              <Text>Send client credentials in body</Text>
            </li>
          </ul>
          <Paragraph>
            Ce type d'autorisation sera utilisé pour chaque requête dans cette
            collection.
          </Paragraph>
        </Paragraph>
      ),
    },
    {
      title: "Envoyer la requête",
      description: (
        <Paragraph>
          Envoyez la requête pour tester l'authentification sur un service Cloud
          Run sécurisé. Si tout est correctement configuré, vous devriez
          recevoir un réponse de votre.
        </Paragraph>
      ),
    },
  ];

  return (
    <div className="site-layout-content" style={{ marginTop: "50px" }}>
      <Title level={2}>Documentation de l'application OAuth2</Title>
      <Divider />

      {/* Section Introduction */}
      <Card id="introduction" style={{ marginBottom: "20px" }}>
        <Title level={3}>Introduction</Title>
        <Paragraph>
          Cette application open source simule un serveur OAuth2, facilitant la
          génération de tokens via Postman. Idéale pour les développeurs
          travaillant avec Google Cloud Platform (GCP), elle simplifie
          l'authentification avec des services comme Cloud Run, sans avoir
          besoin de passer par la ligne de commande. Gagnez du temps et
          concentrez-vous sur ce qui compte vraiment : développer et améliorer
          vos services GCP.
        </Paragraph>
      </Card>

      {/* Section Prérequis */}
      <Card id="prerequis" style={{ marginBottom: "20px" }}>
        <Title level={3}>Prérequis</Title>
        <Paragraph>
          Pour utiliser cette application, vous devez avoir installé le{" "}
          <Text strong>gcloud CLI</Text>.
          <br />
          Vous pouvez l'installer en suivant les instructions sur le site
          officiel de{" "}
          <a href="https://cloud.google.com/sdk/docs/install?hl=fr">
            Google Cloud
          </a>
          .
        </Paragraph>
        <Alert
          message="Assurez-vous que le gcloud CLI est configuré correctement"
          type="info"
          showIcon
        />
      </Card>

      {/* Section Utilisation */}
      <Card id="utilisation" style={{ marginBottom: "20px" }}>
        <Title level={3}>Utilisation</Title>
        <Steps
          direction="vertical"
          size="small"
          current={currentStep}
          onChange={setCurrentStep}
          items={stepsContent}
        />
      </Card>

      {/* Section Exemple avec Postman */}
      <Card id="postman" style={{ marginBottom: "20px" }}>
        <Title level={3}>Exemple avec Postman</Title>
        <Steps
          direction="vertical"
          size="small"
          current={currentPostmanStep}
          onChange={setCurrentPostmanStep}
          items={postmanStepsContent}
        />
      </Card>
    </div>
  );
};

export default Home;
