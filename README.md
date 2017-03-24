# spellcheckr

Code editors do not provide autocorrect for spelling errors which sometimes allow silent execution of comparison operations without catching any exceptions for unknown instantiations. This can be an eye sore when there are over hundreds of lines of code.


Spell Checkr attempts to find these errors by comparing single-event variables with multiple-event variables. By collecting all the rare words used only once in the document and checking for similarities with more common words, those sneaky spelling errors can be found and fixed, saving development time for greater tasks.


Copy and paste your code into the editor for a quick analysis.

Note: Limitations of the algorithm may produce results that are single-events but may not necessarily be incorrect. Like the code editor, the correctness of each word is left up to the discretion of the developer.
