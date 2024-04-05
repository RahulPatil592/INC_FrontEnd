import { Fragment } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
const Willstyles = StyleSheet.create(
    {
        page: {
            padding: 40,
            flexDirection: "column",
            gap: 30,
        },
        u1: {
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: 12,
            gap: 10,
        },
        u2: {
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: 12,
            gap: 10,
        },
        u3: {
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: 12,
            gap: 10,
        },
        v2: {
            flexDirection: "row",
            justifyContent: "flex-start",
            fontSize: 14,
        },
        v3: {
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: 10,
        },
        v4: {
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: 10,
        },
        v5: {
            flexDirection: "row",
            justifyContent: "flex-start",
            fontSize: 12,
        },
        v6: {
            flexDirection: "column",
            alignItems: "baseline",
            fontSize: 12,
        },
        v7: {
            flexDirection: "column",
           justifyContent:"flex-start",
            fontSize: 10,
        },

    }
)

const PDFDocumentWill = ({ data }) => (
    <Document>
        <Page size="A4" style={Willstyles.page}>
            <View style={Willstyles.u1}>
                <Text>Executor Name : {data.newExecutorName} </Text>
                <Link href={data.newExecutorDigitalSign}>View Digital Sign</Link>
                <Text>Aadhar No. : {data.newExecutorIdProof}</Text>
            </View>
            <View style={Willstyles.u2}>
                <Text>Testator Name : {data.newTestatorName}</Text>
                <Link href={data.newTestatorDigitalSign}>View Digital Sign</Link>
                <Text>Aadhar No. : {data.newTestatorIdProof}</Text>
            </View>
            <View style={Willstyles.u3}>
                <Text>Witness Name : {data.newWitnessName}</Text>
                <Link href={data.newWitnessDigitalSign}>View Digital Sign</Link>
                <Text>Aadhar No. : {data.newWitnessIdProof}</Text>
            </View>

            <View style={Willstyles.v3}>
                <Text>Block Id: {data.blockId}</Text>
                <Text>Transaction Hash : {data.transactionHash}</Text>
            </View>
            <View style={Willstyles.v4}>
                <Text>Contract Id: {data.contractId}</Text>
                <Text>Document Id : {data.documentId}</Text>
            </View>
            <View style={Willstyles.v7}>
                <Text>Document Links : </Text>
                <br></br>
                {data.proofs.map((link, index) => (
                    <Link href={link} key={index}>{link}</Link>
                ))}
            </View>
        </Page>
    </Document>
)

export default PDFDocumentWill;