import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
const Willstyles = StyleSheet.create(
    {
      page:{
        padding: 40,
        flexDirection:"column",
        gap:30,
      },
      v1: {
        flexDirection: "row",
        justifyContent:"space-between",
        fontSize: 12,
        gap:10,
      },
      v2: {
        flexDirection: "row",
        justifyContent:"flex-start",
        fontSize: 14,
      },
      v3: {
        flexDirection: "row",
        justifyContent:"space-between",
        fontSize: 10,
      },
      v4: {
        flexDirection: "row",
        justifyContent:"space-between",
        fontSize: 10,
      },
      v5:{
        flexDirection: "row",
        justifyContent:"flex-start",
        fontSize: 12,
      },
      v6:{
        flexDirection: "column",
        alignItems:"baseline",
        fontSize: 12,
      },
      v7:{
        flexDirection: "row",
        justifyContent:"space-between",
        fontSize: 10,
      },

    }
  )

const PDFDocumentWill = (props) => (
    <Document>
      <Page size="A4" style={Willstyles.page}>
        <View style={IPstyles.v1}>
          <Text>Name : Rahul Patil</Text>
          <Link>View Digital Sign</Link>
          <Text>Aadhar No. : 12387432598</Text>
        </View>
        <View style={IPstyles.v2}>
          <Text>Title : This is the title of the IP</Text>

        </View>
        <View style={IPstyles.v3}>
            <Text>Block Id: 48729573495sdfk</Text>
              <Text>Transaction Hash : 12387432598</Text>
        </View>
        <View style={IPstyles.v4}>
        <Text>Contract Id: 48729573495sdfk</Text>
              <Text>Document Hash : 12387432598</Text>
        </View>
        <View style={IPstyles.v5}>
          <Text>Type : IP</Text>
        </View>
        <View style={IPstyles.v6}>
          <Text>Description</Text>
          <Text>dfjkdsnaf.dkn.afdsnsadfknsdf</Text>
        </View>
        <View style={IPstyles.v7}>
          <Link>Link1</Link>
          <Link>Link2</Link>
        </View>
      </Page>
    </Document>
  )

  export default PDFDocumentWill;