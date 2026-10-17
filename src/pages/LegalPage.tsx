import { Box, Container, Typography, Divider, Paper } from "@mui/material";
import { useLocation } from "react-router-dom";

const LegalPage = () => {
  const location = useLocation();
  const isPrivacy = location.pathname === "/privacy";

  const title = isPrivacy ? "Privacy Policy" : "Terms of Service";

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 3,
            border: "1px solid #e5e7eb",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "#d53c00",
              mb: 2,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            {title}
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Last updated: October 17, 2026
          </Typography>

          <Divider sx={{ mb: 4 }} />

          {isPrivacy ? <PrivacyContent /> : <TermsContent />}
        </Paper>
      </Container>
    </Box>
  );
};

const TermsContent = () => (
  <Box>
    <Typography variant="h6" fontWeight={700} gutterBottom>
      1. Introduction
    </Typography>
    <Typography paragraph>
      Welcome to our job portal. By accessing or using this platform, you agree
      to these Terms of Service. If you do not agree, please discontinue using
      the platform.
    </Typography>

    <Typography variant="h6" fontWeight={700} gutterBottom>
      2. Our Services
    </Typography>
    <Typography paragraph>
      Our platform connects job seekers with employers. Job seekers can browse
      job listings and submit applications, while employers can publish
      vacancies and manage applications according to their account permissions
      and subscription plans.
    </Typography>

    <Typography variant="h6" fontWeight={700} gutterBottom>
      3. User Responsibilities
    </Typography>
    <Typography paragraph>
      Users must provide accurate information, keep their login credentials
      secure, and use the platform lawfully. Users must not submit misleading
      job advertisements, fraudulent applications, malicious content, or
      information they are not authorized to share.
    </Typography>

    <Typography variant="h6" fontWeight={700} gutterBottom>
      4. Job Listings and Applications
    </Typography>
    <Typography paragraph>
      Employers are responsible for the accuracy of their job listings. Job
      seekers should independently evaluate opportunities and verify employers
      before sharing sensitive information. We do not guarantee employment,
      interviews, or the legitimacy of every third-party opportunity.
    </Typography>

    <Typography variant="h6" fontWeight={700} gutterBottom>
      5. Accounts and Subscriptions
    </Typography>
    <Typography paragraph>
      Users are responsible for activity carried out through their accounts.
      Paid features, subscription periods, fees, cancellations, and refunds are
      subject to the applicable plan terms and any disclosures presented during
      purchase.
    </Typography>

    <Typography variant="h6" fontWeight={700} gutterBottom>
      6. Content and Platform Availability
    </Typography>
    <Typography paragraph>
      We may update, suspend, or discontinue platform features when reasonably
      necessary. We may review or restrict content or accounts where permitted
      by applicable law and our platform policies.
    </Typography>

    <Typography variant="h6" fontWeight={700} gutterBottom>
      7. Contact
    </Typography>
    <Typography paragraph>
      If you have questions about these terms, please contact us through our{" "}
      <a href="/contact">Contact page</a>.
    </Typography>
  </Box>
);

const PrivacyContent = () => (
  <Box>
    <Typography variant="h6" fontWeight={700} gutterBottom>
      1. Information We Collect
    </Typography>
    <Typography paragraph>
      Depending on how you use the platform, we may collect account details such
      as your name, email address, profile information, employment history, job
      preferences, company details, job listings, applications, and information
      you submit through forms.
    </Typography>

    <Typography variant="h6" fontWeight={700} gutterBottom>
      2. How We Use Your Information
    </Typography>
    <Typography paragraph>
      We use information to create and manage accounts, authenticate users,
      display job listings, facilitate applications, support employer and job
      seeker features, process subscription-related requests, maintain platform
      security, and respond to enquiries.
    </Typography>

    <Typography variant="h6" fontWeight={700} gutterBottom>
      3. Authentication and Service Providers
    </Typography>
    <Typography paragraph>
      We may rely on third-party providers, such as Firebase Authentication and
      hosting or database services, to operate the platform. These providers may
      process information on our behalf in accordance with their applicable
      terms and privacy practices.
    </Typography>

    <Typography variant="h6" fontWeight={700} gutterBottom>
      4. Information Sharing
    </Typography>
    <Typography paragraph>
      Profile and application information may be shared with relevant employers
      when you apply for jobs. Company and job listing information may be
      visible to visitors. We do not promise absolute confidentiality for
      information that users choose to publish publicly.
    </Typography>

    <Typography variant="h6" fontWeight={700} gutterBottom>
      5. Data Security and Retention
    </Typography>
    <Typography paragraph>
      We use reasonable measures intended to protect personal information. No
      online service can guarantee complete security. We retain information for
      as long as reasonably necessary for platform operations, legal
      obligations, dispute resolution, and legitimate business purposes.
    </Typography>

    <Typography variant="h6" fontWeight={700} gutterBottom>
      6. Your Privacy Choices
    </Typography>
    <Typography paragraph>
      Depending on applicable law, you may have rights to request access to,
      correction of, or deletion of your personal information. Requests may be
      subject to identity verification and legal retention requirements.
    </Typography>

    <Typography variant="h6" fontWeight={700} gutterBottom>
      7. Cookies and Similar Technologies
    </Typography>
    <Typography paragraph>
      The platform or its service providers may use cookies or similar
      technologies where necessary for authentication, security, and
      functionality. Any optional tracking or analytics should be disclosed and
      managed as required by applicable law.
    </Typography>

    <Typography variant="h6" fontWeight={700} gutterBottom>
      8. Contact Us
    </Typography>
    <Typography paragraph>
      For privacy-related questions or requests, please contact us through our{" "}
      <a href="/contact">Contact page</a>.
    </Typography>
  </Box>
);

export default LegalPage;
