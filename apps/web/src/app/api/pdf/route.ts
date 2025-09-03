import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { ProposalTemplate } from '@jamb/pdf-templates';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, clientName, description, price, currency, validUntil } = body;

    // Validate required fields
    if (!title || !clientName || !description || !price || !currency) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate PDF
    const pdfBuffer = await renderToBuffer(
      <ProposalTemplate
        title={title}
        clientName={clientName}
        description={description}
        price={price}
        currency={currency}
        validUntil={validUntil || new Date().toISOString().split('T')[0]}
      />
    );

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="proposal-${title.toLowerCase().replace(/\s+/g, '-')}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
