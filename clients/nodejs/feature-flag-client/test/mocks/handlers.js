const { rest } = require('msw');
const { MOCK_FEATURE_FLAG_SERVICE_ENDPOINT } = require('../support');

exports.handlers = [
  rest.post(`${MOCK_FEATURE_FLAG_SERVICE_ENDPOINT}/auth/token`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        token_type: 'Bearer',
        access_token:
          'eyJraWQiOiJkSGNSNmJCek53aVBWZU15WFVlTmV4cTA2dWl0aDBEd0dYcWZnVWZzVjE0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjZWEzODk5Mi0zODRiLTRkNWQtYWJhYy05OGU4OTViMDhiYjAiLCJldmVudF9pZCI6Ijc2MGRhODI1LWZlZWUtNDQ1NC1iMjIwLTg4ZjA0NjNjODMzMyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDA5NDU4MjQsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX1Rpam51eUdzTCIsImV4cCI6MTYwMTAzMjIyNCwiaWF0IjoxNjAwOTQ1ODI0LCJqdGkiOiIxNTBjMjFkZi0xMGJkLTRkOTEtYjU0NC1hOWFiMGU1ZGQ3NmMiLCJjbGllbnRfaWQiOiI0Yjh2aG9rcXAxdXBvYTV0NGhscDlvdXJoayIsInVzZXJuYW1lIjoiNjQ1ZGE3MDFmY2UyYTEyYyJ9.OnnsiGgie1dCY7xC3Tr5FADEteo9u8LAnDQWBbyoTgKvuFN7skiaOC6EUopUqY42x-hgYm1X83jY5LAa0JlxFQbOzHIBo747eCQYm5WlrIVAAJ1VAvMqPrcbH44mT1uv_berLVOyrTyCBaes4_UDvVk8mYavsi6dD9ztpgEQdcdlMKc-pHPpm-P8lAMwQmVLXNEk5h6bsVJ9rQhz5qHxO94zZ5mXee_e_k6iigHyNyuRT5Q8SSJ8nH0dPJKzwIIhUnX5RtHR-kUgylNzKiYkOBfAZpVPan0w-R5QxhWivo-92k8byp1VdjaMvtbY_RRn7MqKe5XOoGQVoxPSx6afOw',
        refresh_token:
          'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.L5Exifgyz2EJZdWscXYSmZ2g1YUc5dfYLzcQj0tSzfgmrNUBiyN4oy9KTAn7cxXcbkjErkRZJ0CEBKNemAioZ_PIBCZAMj-K6X_IEmwi6FoNlc5k6Ulb-eBZC96a1Ixg17F8cXmvHxvzqhax0Zu3PJ340WnTQu0eqXn4wKEQ4eV8xZVxlCLWExePCQ0iaf-rj31UCEr9GCKMCSVNIatRjsq6dYXz7oYp3kjdQWfl7CmKaP5LUDF9Op3jEoQKsvfvG0JkEpWg-dFnfn3jnsTchDs-IYkB8XnA28NMNIeHUe63_NKsceDwAkEimmF2bjC8wRLNsE58hI5q_nRdCjW0sA.XjM0mnOgf96tCY2Y.gjYRJXk2E63nEHsDSRMQyuWJyIokig1usnHLqWP8xH3YjN2GwGLZtsCmoALboXahrb9Ay14bjG5lX32ldGJevTQx7hu5nl-tVblpcPo02S3pq-QI6h4g83lmtJG0HLGYpiC7jF_uyr4PofxDc1Uy0wUeTtCjm9qv96zt2L_3aRc-11o4dUVAKNS9Eet1tZz_P42IO-VJklsiKhdIGQfbhMUyq4_8UpcnadWDg2FNAEWc49OFunNlDfeGQ0vfeyYbRTL6GdWLFfIs4OoNsbtxHGO62D1eJNNpaLd0UYBKWTlKHEi0UVm4kKq0rQfpy7ENJhq98xp3P6wdUVeJoaY2aIe3EsD9Z-C0sfc6xT_m7jQSg-2-cNTJ47Mp7JsoQS9D301c0KWMhPxiVH0ajYb0BFmb_SDuEBOWiaL4UArnG0NsS_a5j2WXd3Kz1_2ySy1XDBe8S2A_WnBNItfdv8DE7EZABKWF-pA3Gp3eKHb0g2mZ7aUfeWuasHUn5PJL2yuYtr_Q0zqaENbXjLUxf0Gys2tI651TG2ZuPuEJ2a7YZFYoTBDbBmoJC7whzi358t5koi2ODfxs4Ux0DFoAckT8B379SWqDAYa6CWozW42SqDdaf5NjQmpRbcWNy_WODgrs8kA11zu5RXnfuXFNzGjlkjecABa9M2i9nfiRnKgcUQgJMPG4jlV2CYMFdpLIEp-d3q6eaBN3jECpjIUwPz6AVgl5lPoyItq-7vTgM6paqHeibieL2R1aYsSbCJ3EggmZ1IXOHFVSfMFj6bytJ_eT-lUgd8eIfPZ3DBXvp9XCh_NOqQcPTzD6N14fUKin3s4fWQGlj4lBTn-oUJ5s2LuBhw1wStV0cK9Q4voVucjNScgNxHUAnRnU1Fdu8kaICClIRoPtWwHVA68OczBJEljda12TxWHJhpue2k2QFi7ePOrIWp-Wp4cmN2EsCy4nQ-7QauysbFl1Kic5yV3GtoKodGOrGRcgx8p93V0IWCCDvKbBYQ5nJwenuyoAOdzpSFqYQXjCeRi4CbMXXK0G5lkmS0ul2Hb3yxBCLXW533m4YMbPKvexAmh6eP3cdfpUEtHvw7H2g8DNBk7-rhvG0hcP6Tt_Y-jgLIsdwFpk-K5SGGz1Wlwi9ktrzkpt7waUFzXCU1Awr_Ak17nkufYYJZorwRHJd7Zl8v_oPn-wULfrCJVFDZvK8tZiQJy3GM9yhMU4F13gQT5nVGiM1p0PhntY9TDQ5Cn-8Ra9MhJmgiIvaZwqpxoI-Tpau_jGCvQx3GwOfKCSGIRGmGLcfoGE24DgXDw.IJqro8DeMl3YVOlDGfMYQw',
        expires_in: 86400
      })
    );
  }),
  rest.get(`${MOCK_FEATURE_FLAG_SERVICE_ENDPOINT}/api/v1/features`, (req, res, ctx) => {
    const productName = req.url.searchParams.get('productName');

    if (productName.includes('non-existing')) {
      return res(
        ctx.status(404),
        ctx.json({
          error: `Features for ${productName} cannot be found. productName might be invalid`
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        'Burning Hot': {
          name: 'Burning Hot',
          enabled: false,
          createdAt: '2020-09-24T09:30:41.905Z',
          updatedAt: '2020-09-24T09:30:41.905Z'
        },
        'Luke Warm': {
          name: 'Luke Warm',
          enabled: false,
          createdAt: '2020-09-24T09:30:48.576Z',
          updatedAt: '2020-09-24T09:30:48.576Z'
        },
        'Ice Cold': {
          name: 'Ice Cold',
          enabled: false,
          createdAt: '2020-09-24T09:30:54.276Z',
          updatedAt: '2020-09-24T09:30:54.276Z'
        }
      })
    );
  })
];
