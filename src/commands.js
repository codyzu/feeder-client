import {DateTime} from 'luxon'

async function runCommand(firebase, {command, options = {}}) {
  const commandData = {
    command,
    options,
    isPending: true,
    createdAt: new Date(),
    expiresAt: DateTime.local()
      .plus({minutes: 10})
      .toJSDate(),
  }

  console.log('WRITING:', commandData)

  await firebase
    .firestore()
    .collection('jobs')
    .doc()
    .set(commandData)
}

export default runCommand
