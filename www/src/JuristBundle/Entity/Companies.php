<?php

namespace JuristBundle\Entity;

/**
 * Companies
 */
class Companies
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $name;

    /**
     * @var integer
     */
    private $jurist;

    /**
     * @var integer
     */
    private $authUsers;

    /**
     * @var string
     */
    private $description;

    /**
     * @var \JuristBundle\Entity\Rubric
     */
    private $rubrics;

    /**
     * @var \JuristBundle\Entity\Questions
     */
    private $questions;

    /**
     * @var \JuristBundle\Entity\Jurists
     */
    private $jurists;

    /**
     * @var \DateTime
     */
    private $dateTime;

    /**
     * @var \DateTime
     */
    private $createdAt;

    /**
     * @var \DateTime
     */
    private $editedAt;


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set jurist
     *
     * @param integer $jurist
     *
     * @return Companies
     */
    public function setJurist($jurist)
    {
        $this->jurist = $jurist;

        return $this;
    }

    /**
     * Get jurist
     *
     * @return integer
     */
    public function getJurist()
    {
        return $this->jurist;
    }

    /**
     * Set authUsers
     *
     * @param integer $authUsers
     *
     * @return Companies
     */
    public function setAuthUsers($authUsers)
    {
        $this->authUsers = $authUsers;

        return $this;
    }

    /**
     * Get authUsers
     *
     * @return integer
     */
    public function getAuthUsers()
    {
        return $this->authUsers;
    }


    /**
     * Set name
     *
     * @param string $name
     *
     * @return Companies
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Companies
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set rubrics
     *
     * @param \JuristBundle\Entity\Rubrics
     *
     * @return Companies
     */
    public function setRubrics($rubrics)
    {
        $this->rubrics = $rubrics;

        return $this;
    }

    /**
     * Get rubrics
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getRubrics()
    {
        return $this->rubrics;
    }

    /**
     * Set questions
     *
     * @param \JuristBundle\Entity\Questions
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function setQuestions($questions)
    {
        $this->questions = $questions;

        return $this;
    }

    /**
     * Get questions
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getQuestions()
    {
        return $this->questions;
    }

    /**
     * Set jurists
     *
     * @param \JuristBundle\Entity\Jurists
     *
     * @return Companies
     */
    public function setJurists($jurists)
    {
        $this->jurists = $jurists;

        return $this;
    }

    /**
     * Get jurists
     *
     * @return string
     */
    public function getJurists()
    {
        return $this->jurists;
    }

    /**
     * Set dateTime
     *
     * @param \DateTime $dateTime
     *
     * @return Companies
     */
    public function setDateTime($dateTime)
    {
        $this->dateTime = $dateTime;

        return $this;
    }

    /**
     * Get dateTime
     *
     * @return \DateTime
     */
    public function getDateTime()
    {
        return $this->dateTime;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Companies
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set editedAt
     *
     * @param \DateTime $editedAt
     *
     * @return Companies
     */
    public function setEditedAt($editedAt)
    {
        $this->editedAt = $editedAt;

        return $this;
    }

    /**
     * Get editedAt
     *
     * @return \DateTime
     */
    public function getEditedAt()
    {
        return $this->editedAt;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->jurist = new \Doctrine\Common\Collections\ArrayCollection();
        $this->rubrics = new \Doctrine\Common\Collections\ArrayCollection();
        $this->questions = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add jurist
     *
     * @param \JuristBundle\Entity\Jurists $jurist
     *
     * @return Companies
     */
    /*public function addJurist(\JuristBundle\Entity\Jurists $jurist)
    {
        $this->jurist[] = $jurist;

        return $this;
    }*/

    /**
     * Add authUsers
     *
     * @param \JuristBundle\Entity\AuthUsers $authUsers
     *
     * @return Companies
     */
    public function addAuthUsers(\JuristBundle\Entity\authUsers $authUsers)
    {
        $this->authUsers[] = $authUsers;

        return $this;
    }

    /**
     * Remove jurist
     *
     * @param \JuristBundle\Entity\Jurists $jurist
     */
    /*public function removeJurist(\JuristBundle\Entity\Jurists $jurist)
    {
        $this->jurist->removeElement($jurist);
    }*/

    /**
     * Remove authUsers
     *
     * @param \JuristBundle\Entity\AuthUsers $authUsers
     */
    public function removeAuthUsers(\JuristBundle\Entity\AuthUsers $authUsers)
    {
        $this->jurist->removeElement($authUsers);
    }

    /**
     * Add rubric
     *
     * @param \JuristBundle\Entity\Rubrics $rubric
     *
     * @return Companies
     */
    public function addRubric(\JuristBundle\Entity\Rubrics $rubric)
    {
        $this->rubrics[] = $rubric;

        return $this;
    }

    /**
     * Remove rubric
     *
     * @param \JuristBundle\Entity\Rubrics $rubric
     */
    public function removeRubric(\JuristBundle\Entity\Rubrics $rubric)
    {
        $this->rubrics->removeElement($rubric);
    }

    /**
     * Add question
     *
     * @param \JuristBundle\Entity\Questions $question
     *
     * @return Companies
     */
    public function addQuestion(\JuristBundle\Entity\Questions $question)
    {
        $this->questions[] = $question;

        return $this;
    }

    /**
     * Remove question
     *
     * @param \JuristBundle\Entity\Questions $question
     */
    public function removeQuestion(\JuristBundle\Entity\Questions $question)
    {
        $this->questions->removeElement($question);
    }
}
