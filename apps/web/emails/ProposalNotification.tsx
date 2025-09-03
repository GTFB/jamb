import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ProposalNotificationEmailProps {
  clientName: string;
  proposalTitle: string;
  proposalUrl: string;
}

export const ProposalNotificationEmail: React.FC<ProposalNotificationEmailProps> = ({
  clientName,
  proposalTitle,
  proposalUrl,
}) => (
  <Html>
    <Head />
    <Preview>New proposal available: {proposalTitle}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Proposal Available</Heading>
        
        <Section style={section}>
          <Text style={text}>
            Hello {clientName},
          </Text>
          
          <Text style={text}>
            We're excited to share a new proposal with you: <strong>{proposalTitle}</strong>
          </Text>
          
          <Text style={text}>
            You can view the full proposal by clicking the link below:
          </Text>
          
          <Text style={text}>
            <a href={proposalUrl} style={link}>
              View Proposal
            </a>
          </Text>
          
          <Text style={text}>
            If you have any questions or need to discuss the proposal, please don't hesitate to reach out.
          </Text>
          
          <Text style={text}>
            Best regards,<br />
            The Jamb Team
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
};

const section = {
  padding: '24px',
  backgroundColor: '#ffffff',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const link = {
  color: '#2754C5',
  textDecoration: 'underline',
};

export default ProposalNotificationEmail;
