import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
const IPstyles = StyleSheet.create(
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
        flexDirection: "column",
        alignItems:"baseline",
        gap:10,
        fontSize: 10,
      },

    }
  )

const PDFDocumentIP = ({data}) => (
    <Document>
      <Page size="A4" style={IPstyles.page}>
        <View style={IPstyles.v1}>
          <Text>Name : {data.newOwnerName}</Text>
          <Link href={data.newOwnerDigitalSign}>View Digital Sign</Link>
          <Text>Aadhar No. : {data.newOwnerProofIdentifier}</Text>
        </View>
        <View style={IPstyles.v2}>
          <Text>Title : {data.newTitle}</Text>

        </View>
        <View style={IPstyles.v3}>
            <Text>Block Id: {data.blockId}</Text>
              <Text>Transaction Hash : {data.transactionHash}</Text>
        </View>
        <View style={IPstyles.v4}>
        <Text>Contract Id: {data.contractId}</Text>
              <Text>Document Id : {data.documentId}</Text>
        </View>
        <View style={IPstyles.v5}>
          <Text>Type : IP</Text>
        </View>
        <View style={IPstyles.v6}>
          <Text>Description</Text>
          <Text>{data.newDescription}</Text>
        </View>
        <View style={IPstyles.v7}>
            {
                data.proofs.map((link,index)=>{
                    <Link key={index}>{link}</Link>
                })
            }
        </View>
      </Page>
    </Document>
  )

  export default PDFDocumentIP;