import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 40,
    fontSize: 12
  },
  section: {
    paddingBottom: 20
  },
  headText: {
    color: "blue",
    fontWeight: 300,
    paddingBottom: 3,
    fontSize: 15
  },
  secondaryText: {
    opacity: 0.8,
    paddingBottom: 3
  },
  secondaryTextSubtitle: {
    opacity: 0.4,
    paddingBottom: 6
  },
  secondaryTextLink: {
    opacity: 0.8,
    paddingBottom: 3,
    color: "blue"
  },
  subTextTitle: {
    paddingBottom: 5,
    opacity: 0.8
  },
  subTextSubTitle: {
    fontSize: 12,
    opacity: 0.7,
    paddingBottom: 5
  },
  subTextDescription: {
    fontSize: 12,
    paddingBottom: 10
  },
  subTextDuration: {
    opacity: 0.6,
    fontSize: 12
  }
});

const PDFDocument = (props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.headText}>
          {props.name}
        </Text>
        <Text style={styles.secondaryTextSubtitle}>
          {props.name}
        </Text>
        <Text style={styles.secondaryText}>
          Email:  {props.name}
        </Text>
        <Text style={styles.secondaryText}>
          Mobile:  {props.name}
        </Text>
        <Link style={styles.secondaryTextLink}>
          {props.name}
        </Link>
      </View>
      <View style={styles.section}>
        <Text style={styles.secondaryTextSubtitle}>
          Work Experience
        </Text>
        {/* {props.PortfolioData.WorkExperience.map((item, index) => (
                  <Fragment key={index}>
                      <Text style={styles.subTextTitle}>
                          <Text>
                              {item.Company}
                          </Text>
                          <Text style={styles.subTextDuration}>
                              {`  ${item.From} - ${item.To}`}
                          </Text>
                      </Text>
                      <Text style={styles.subTextSubTitle}>
                          {item.JobTitle}
                      </Text>
                      <Text style={styles.subTextDescription}>
                          {item.JobGist}
                      </Text>
                  </Fragment>
              ))} */}
      </View>
      <View style={styles.section}>
        <Text style={styles.secondaryTextSubtitle}>
          Side Projects
        </Text>
        {/* {props.PortfolioData.SideProjects.map((item, index) => (
                  <Fragment key={index}>
                      <Text style={styles.subTextTitle}>
                          <Text>
                              {item.ProjectName}
                          </Text>
                      </Text>
                      <Text style={styles.subTextSubTitle}>
                          {item.ProjectTitle}
                      </Text>
                      <Text style={styles.subTextDescription}>
                          {item.ProjectGist}
                      </Text>
                  </Fragment>
              ))} */}
      </View>
      <View style={styles.section}>
        <Text style={styles.secondaryTextSubtitle}>
          Education
        </Text>
        {/* {(props.PortfolioData.ShowPostGraduation) ? (
                  <Fragment>
                      <Text>
                          {props.PortfolioData.Education[0].Name}
                      </Text>
                      <Text style={styles.subTextTitle}>
                          <Text>
                              {props.PortfolioData.Education[0].Degree}
                          </Text>
                          <Text style={styles.subTextDuration}>
                              {`  ${props.PortfolioData.Education[0].Session}`}
                          </Text>
                      </Text>
                      <Text style={styles.subTextTitle}>
                          CGPA: {props.PortfolioData.Education[0].CGPA}
                      </Text>
                  </Fragment>
              ) : null} */}
        <Text>
          fdg
        </Text>
        <Text style={styles.subTextTitle}>
          <Text>
            dfs
            {/* {props.PortfolioData.Education[1].Degree} */}
          </Text>
          <Text style={styles.subTextDuration}>
            gfdsgf
            {/* {`  ${props.PortfolioData.Education[1].Session}`} */}
          </Text>
        </Text>
        <Text style={styles.subTextTitle}>
          CGPA: 10
        </Text>
      </View>
      {false ? (
        <View style={styles.section}>
          <Text style={styles.secondaryTextSubtitle}>
            Certifications
          </Text>
          {/* {props.PortfolioData.Certifications.map((item, index) => (
                      <Fragment key={index}>
                          <Text style={styles.subTextTitle}>
                              <Text>
                                  {item.CertificateName}
                              </Text>
                              <Text style={styles.subTextDuration}>
                                  {item.CertificateDuration}
                              </Text>
                          </Text>
                          <Text style={styles.subTextDescription}>
                              {item.CertificateDescription}
                          </Text>
                      </Fragment>
                  ))} */}
        </View>
      ) : null}
      <View style={styles.section}>
        <Text style={styles.secondaryTextSubtitle}>
          Highlights
        </Text>
        <Text>dhg</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.secondaryTextSubtitle}>
          Skill Set
        </Text>
        <Text>
          gdfgh
        </Text>
      </View>
    </Page>
  </Document>
);
// Define the component that handles PDF download
const PDFDownloadComponent = ({ data }) => (
  <div className='mdbtn mdbtn1'>
    <PDFDownloadLink document={<PDFDocument data={data} />} fileName="document.pdf" className='pdfdwmlnk_ip'>
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download PDF'
      }
    </PDFDownloadLink>
  </div>
);

export default PDFDownloadComponent;
