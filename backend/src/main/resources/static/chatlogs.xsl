<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" indent="yes"/>
    <xsl:template match="/chatLogs">
        <html>
            <head>
                <title>Chat Logs</title>
                <style>
                    table { width:100%; border-collapse: collapse; }
                    th, td { border:1px solid #666; padding:8px; }
                    th { background:#ddd; }
                </style>
            </head>
            <body>
                <h2>Chat Logs</h2>
                <table>
                    <tr><th>ID</th><th>Sender</th><th>Message</th><th>When</th></tr>
                    <xsl:for-each select="chatLog">
                        <tr>
                            <td><xsl:value-of select="id"/></td>
                            <td><xsl:value-of select="sender"/></td>
                            <td><xsl:value-of select="content"/></td>
                            <td><xsl:value-of select="timestamp"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
