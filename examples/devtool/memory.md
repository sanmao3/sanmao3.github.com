A good workflow to find memory leaks is the three snapshot technique, first used by Loreena Lee and the Gmail team to solve some of their memory problems. The steps are, in general:

- Take a heap snapshot.
- Do stuff.
- Take another heap snapshot.
- Repeat the same stuff.
- Take another heap snapshot.
- Filter objects allocated between Snapshots 1 and 2 in Snapshot 3's "Summary" view.